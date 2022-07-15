import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { Item } from 'src/app/model/item';
import { ManagerState } from 'src/app/store';
import { getGlobalParams } from 'src/app/store/auxiliars/auxiliars.selectors';
import { getOptions } from 'src/app/store/Dialogs/dialog.selectors';
import { ButtonPillsService } from 'src/app/services/buttons/button-pills.service';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { ORDERDETAILSTATUS } from 'src/app/utils/mncTypes-enums';
@UntilDestroy()
@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.scss']
})
export class ItemTileComponent implements OnInit {
  @Input() item
  imageUrl
  content
  orderSelected
  buttons =  [
    {label: 'options', color: 'lavender soft-black size10'},
    {id:'IDW',label: 'X', color: 'hard-red soft-black size10 white min-fit'},
    {id:'qty',label: 'Mark as Delivered', color: 'hard-red white size10'},
  ]
  constructor(
    private store: Store<ManagerState>,
    private _pillsService: ButtonPillsService,
    ) { }
  ngOnInit(): void {
    this.content = this.store.select(getOptions)
    this.imageUrl = this.store.select(getGlobalParams)
    .pipe(
        take(1),
        map(e =>e.IMAGE_URL ),
          shareReplay()
    );
    this.store.select(getSelected)
    .pipe(untilDestroyed(this),
    tap(e => this.orderSelected = e),
    )
    .subscribe()
  }

  adjustPrice(price){
    return Number(price).toFixed(2)
  }

  insertOnItem(key, value){
    if(value < 1) value = '1'
    this.item = new Item().setItem({...this.item, [key]:value})
    this._pillsService.fillVariables()
    this._pillsService.updateItemListOperation(this.item)
  }

  adjustItem(item){
    return new Item().setItem({...item, order_detail_status: `${ORDERDETAILSTATUS.Delivered}`})
  }

}
