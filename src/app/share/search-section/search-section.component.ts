import { AfterViewInit, Component, ElementRef, Input,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { fromEvent, zip } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { RequestService } from 'src/app/services/api/request.service';
import { OperationIndex } from 'src/app/services/utils/operations.index';
import { ManagerState } from 'src/app/store';
import { getLocationId, getMerchantId, getUserId } from 'src/app/store/user/user.selectors';
import { ORDERSTATUS } from 'src/app/utils/mncTypes-enums';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements AfterViewInit {
  @Input() hasNewOrder = true
  fatOne = {classes:'searchButton white',label:'Search'}
  @ViewChild('searchInput') searchInput: ElementRef;
  merchant_id
  location_id
  user_id
  loading = false
  searchIcon = true

  constructor(
    private _requestService: RequestService,
    public location: Location,
    private router: Router, 
    private store: Store<ManagerState>) {
    zip(this.store.select(getMerchantId), this.store.select(getLocationId), this.store.select(getUserId))
    .pipe(take(1))
    .subscribe(([e, l, id]) =>{ this.merchant_id = e; this.location_id = l, this.user_id =id})
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement,'keyup')
    .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        map((e) => e['target'].value),
        switchMap((text) => {
          this.loading = true
          if(text.length > 0) this.router.navigate(['/orders'])
          return this._requestService.buildRequest([
            {operation: OperationIndex.search_orders,
              plain: new Order().setOrder({searchword : text, merchant_id: this.merchant_id, location_id: this.location_id, user_id: this.user_id})},
          ], false)
        })
    )
    .subscribe(e => this.loading = false);
  }

  public clearSearch() {
    console.log('clear', this.searchInput)
    this.searchInput.nativeElement.value = '';
    this.loading = true
    this._requestService.buildRequest([
      {operation: OperationIndex.search_orders,
        plain: new Order().setOrder({merchant_id: this.merchant_id, location_id: this.location_id, order_status_id: `${ORDERSTATUS.Open}`})},
    ], false).pipe(take(1)).subscribe(e => this.loading = false)
  }



}
