import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { Item } from 'src/app/model/item';
import { ManagerState } from 'src/app/store';
import { getGlobalParams } from 'src/app/store/auxiliars/auxiliars.selectors';
import { loadDialogDetailsSuccess } from 'src/app/store/Dialogs/dialog.actions';
import { getDetails } from 'src/app/store/Dialogs/dialog.selectors';
import { getRow, getWholeItemState } from 'src/app/store/items/items.selectors';
import { ItemsStoreService } from 'src/app/store/items/items.service';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';
import { getUserState } from 'src/app/store/user/user.selectors';
@UntilDestroy()
@Component({
  selector: 'app-details-content',
  templateUrl: './details-content.component.html',
  styleUrls: ['./details-content.component.scss']
})
export class DetailsContentComponent implements OnInit {
  total
  position
  content
  imageUrl
  item
  orderNumber
  location_id
  constructor(
    private store: Store<ManagerState>,
    private _itemsService: ItemsStoreService
    ) { }

  ngOnInit(): void {
    this.orderNumber = this.store.select(getSelectedOrdernumber)
    this.content = this.store.select(getDetails)
    .pipe(
      tap(e => this.item = e ),
      shareReplay()
      )

    this.store.select(getWholeItemState)
    .pipe( untilDestroyed(this),tap(e => {
      let {position, total} = e
      this.position = position
      this.total = total
    })).subscribe()
    this.imageUrl = this.store.select(getGlobalParams)
    .pipe(
        take(1),
        map(e =>e.IMAGE_URL ),
          shareReplay()
    );
    this.store.select(getUserState)
    .pipe(untilDestroyed(this),tap(e => this.location_id = e.location_id))
    .subscribe()
  }

  insertOn(key, value){
    let aux = new Item().setItem({...this.item})
      aux[key] = value
      this.store.dispatch(loadDialogDetailsSuccess({data: aux}))
  }

  changePosition(aux){
    this.store.select(getRow)
    .pipe(
      take(1),
      tap(e => {
        let item = e['PC'][this.position + aux]
        item = new Item().setItem({...item, location_id: this.location_id, merchantId: item.merchantIdAlt? item.merchantIdAlt: item.merchantId})
      this._itemsService.activeItem(this.total, null, this.position + aux, item)
    }))
    .subscribe()
  }


}
