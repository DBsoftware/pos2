import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CAROUSEL_TYPE } from './static-data';
import { Store } from '@ngrx/store';
import { ManagerState} from '../../store/index'
import { openDialogDetailsSuccess } from 'src/app/store/Dialogs/dialog.actions';
import { getDetailsOpenstate } from 'src/app/store/Dialogs/dialog.selectors';
import { filter, map, shareReplay, take, tap } from 'rxjs/operators';
import { ItemsStoreService } from 'src/app/store/items/items.service';
import { areThereCoordinates, getGlobalParams } from 'src/app/store/auxiliars/auxiliars.selectors';
import { selectRow } from 'src/app/store/items-collection/items-collection.selectors';
import { ITEM_STATUS, PATHS } from 'src/app/utils/mncTypes-enums';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { getUserState } from 'src/app/store/user/user.selectors';
import { Item } from 'src/app/model/item';

@UntilDestroy()
@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() product
  @Input() category_id
  @Input() row
  @Input() position
  @Input() total = 0
  @Input() type = 'PC'
  @Input() moduleTypeId: string = '83010';
  @Input() CAROUSEL_TYPE = CAROUSEL_TYPE
  @Input() isLast:boolean = false
  ITEM_STATUS = ITEM_STATUS
  orderSelected
  isWaiter
  location_id
  constructor(
    private router: Router,
    private store: Store<ManagerState>,
    private _itemsService: ItemsStoreService,
    private _utils: UtilsService
    ) { }

  navigate(e,product) {
    e.stopPropagation();
    e.preventDefault();
    switch (this.type) {
        case CAROUSEL_TYPE.BUSINESS:
            this.navigateToMerchant(product);
            break;
        case CAROUSEL_TYPE.AD:
            this.navigateToAd(product);
            break;
        case CAROUSEL_TYPE.PRODUCT:
        case CAROUSEL_TYPE.ADV:
            this.navProductOrSpecial(
                product,
                Number(product.itemType) === 23 ? '/adv' : '/products');
            break;
    }
}

  ngOnInit(): void {
    this.isWaiter = !this.router.url.includes(PATHS.COUNTER) &&  !this.router.url.includes(PATHS.KITCHEN)
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
    map((e: NavigationEnd) => e.url),
    untilDestroyed(this),
    map(e => !e.includes(PATHS.COUNTER) &&  !e.includes(PATHS.KITCHEN)),
    tap(e => this.isWaiter = e)).subscribe()
    
    this.store.select(selectRow, {id : this.category_id})
    .pipe(take(1),filter(e => !!e))
    .subscribe(e => this.row = e)
    this.store.select(getUserState)
    .pipe(untilDestroyed(this),tap(e => this.location_id = e.location_id))
    .subscribe()
    this.store.select(getSelected)
    .pipe(untilDestroyed(this),tap(e => this.orderSelected = e))
    .subscribe()

  }

  navigateToMerchant({companyName: name}) {
    // this.store.dispatch(loadMerchantIDSuccess({id: this.merchantId}));
    this.router.navigate(['../../merchant', this.addFlag()]);
}

addFlag(){
  // return this.hexMerchantId.includes('null:') || !this.hexMerchantId.includes(this.merchantId) ? 
  // `${this.merchantId}:${this.product && this.product['restaurantFlag'] && this.product['restaurantFlag'].includes('true')?'T':'F'}`
  // : this.hexMerchantId
}

navProductOrSpecial({id}, path) {
  // this.store.dispatch(loadMerchantIDSuccess({id:this.merchantId}));
  this.router.navigate([path, id,this.addFlag()]);
}

navigateToAd({playlistId}) {
  // this.store.dispatch(loadMerchantIDSuccess({id:this.merchantId}));
  this.router.navigate(['/ad', playlistId,this.addFlag()]);
}

  openDialog(){
    if (this.isWaiter) {
      console.log('is waiter',this.product.merchantIdAlt, this.product.merchantId, this.position, this.row.category_id, this.category_id, this.product.category_id)
      this._itemsService.activeItem(this.total, this.row, this.position, new Item().setItem({...this.product, location_id: this.location_id, merchantId: this.product.merchantIdAlt? this.product.merchantIdAlt: this.product.merchantId}))
      this.router.navigate(['/order-details/item-detail'+`${!!this.orderSelected && this.orderSelected.id ? ('/' + this.orderSelected.id) : ''}/${this.row.category_id ? (this.row.category_id) : this.category_id}/${this.product.id}/${this.total}/${this.position}`])
    } else {
      this._utils.updateSubject.next(false)
      this.store.select(getDetailsOpenstate)
      .pipe(take(1))
      .subscribe(e => {
        this._itemsService.activeItem(this.total, this.row, this.position, new Item().setItem({...this.product, location_id: this.location_id, merchantId: this.product.merchantIdAlt? this.product.merchantIdAlt: this.product.merchantId}))
        !e ? this.store.dispatch(openDialogDetailsSuccess({data: true})) : null 
      })
    }
  }

}
