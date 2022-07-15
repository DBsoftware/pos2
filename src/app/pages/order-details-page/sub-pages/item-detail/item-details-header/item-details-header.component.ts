import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter, shareReplay, take, tap } from 'rxjs/operators';
import { Item } from 'src/app/model/item';
import { ManagerState } from 'src/app/store';
import { getDetails } from 'src/app/store/Dialogs/dialog.selectors';
import { getRow, getWholeItemState } from 'src/app/store/items/items.selectors';
import { ItemsStoreService } from 'src/app/store/items/items.service';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { getUserState } from 'src/app/store/user/user.selectors';
@UntilDestroy()
@Component({
  selector: 'app-item-details-header',
  templateUrl: './item-details-header.component.html',
  styleUrls: ['./item-details-header.component.scss']
})
export class ItemDetailsHeaderComponent implements OnInit {
  position = 1
  total = 0
  content
  item: Item
  orderSelected
  row
  location_id
  constructor(
    private store: Store<ManagerState>,
    private router: Router,
    private _itemsService: ItemsStoreService) { }

  ngOnInit(): void {
    this.content = this.store.select(getDetails)
    .pipe(
      tap(e => this.item = e ),
      shareReplay()
      )
      this.store.select(getWholeItemState)
      .pipe( untilDestroyed(this),tap(e => {
        let {position, total} = e
        this.position = Number(position)
        this.total = total
      })).subscribe()
      this.store.select(getSelected)
      .pipe(untilDestroyed(this),tap(e => this.orderSelected = e))
      .subscribe()
      this.store.select(getUserState)
      .pipe(untilDestroyed(this),tap(e => this.location_id = e.location_id))
      .subscribe()
  }

  changePosition(aux){
    this.store.select(getRow)
    .pipe(
      take(1),
      tap(e => {
        this.row =e
        let item = e['PC'][this.position + aux]
        item = new Item().setItem({...item, location_id: this.location_id, merchantId: item.merchantIdAlt? item.merchantIdAlt: item.merchantId})
      this._itemsService.activeItem(this.total, null, this.position + aux, item)
        this.router.navigate(['/order-details/item-detail'+`${!!this.orderSelected && this.orderSelected.id ? ('/' + this.orderSelected.id) : ''}/${this.row.category_id ? (this.row.category_id) : this.item.category_id}/${this.item.id}/${this.total}/${this.position}`])
    }))
    .subscribe()
  }

}
