import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, zip } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { OperationIndex } from 'src/app/services/utils/operations.index';
import { RequestService } from 'src/app/services/api/request.service';
import { ManagerState } from 'src/app/store';
import { getMerchantId, getLocationId } from 'src/app/store/user/user.selectors';
import { loadCountersSuccess, loadSubtitleSuccess } from 'src/app/store/counter-state/counter.actions';
import { ORDERSTATUS, Subtitle } from 'src/app/utils/mncTypes-enums';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  searchContextIsActive = false;
  searchString = ''
  @Input() label = 'Order lookup'
  searchIcon = true
  loading = false
  merchant_id
  location_id
  @Input() kind = false
  @Input() hasButton = false
  @ViewChild('searchInput') searchInput: ElementRef;
  constructor(private _requestService: RequestService, private store: Store<ManagerState>) {
    zip(this.store.select(getMerchantId), this.store.select(getLocationId))
    .pipe(take(1))
    .subscribe(([e, l]) =>{ this.merchant_id = e; this.location_id = l})
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
          if(!this.kind) this.storeOrders()
          return this._requestService.buildRequest([
            {operation: this.resolveOpertaion(),
              plain: this.resolveObject(text)},
          ], false)
        })
    )
    .subscribe(e => this.loading = false);
  }

  storeOrders(){
    this.store.dispatch(loadSubtitleSuccess({value: Subtitle.SEARCH}))
    this.store.dispatch(loadCountersSuccess({value: 'first'}))
  }
  resolveOpertaion(){
    return !this.kind? OperationIndex.search_orders : OperationIndex.search_Customer
  }

  resolveObject(text){
    return !this.kind?
    new Order().setOrder({searchword : text, merchant_id: this.merchant_id, location_id: this.location_id}):
    new Customer().searchCustomer({searchword : text,merchant_id: this.merchant_id})
  }

public clearSearch() {
  console.log('clear', this.searchInput)
  this.searchInput.nativeElement.value = '';
  this.store.dispatch(loadSubtitleSuccess({value: Subtitle.ACTIVE}))
  this.store.dispatch(loadCountersSuccess({value: 'first'}))
  this.loading = true
  this._requestService.buildRequest([
    {operation: OperationIndex.search_orders,
      plain: new Order().setOrder({merchant_id: this.merchant_id, location_id: this.location_id, order_status_id: `${ORDERSTATUS.Open}`})},
  ], false).pipe(take(1)).subscribe(e => this.loading = false)
}
search(){}

}
