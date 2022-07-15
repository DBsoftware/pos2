import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Item } from 'src/app/model/item';
import { ManagerState } from 'src/app/store';
import { getGlobalParams } from 'src/app/store/auxiliars/auxiliars.selectors';
import { loadDialogDetailsSuccess } from 'src/app/store/Dialogs/dialog.actions';
import { getDetails, getDetailsAuxiliar } from 'src/app/store/Dialogs/dialog.selectors';
import { getRow, getWholeItemState } from 'src/app/store/items/items.selectors';
@UntilDestroy()
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  areasOne = [
    {label: 'Description'},
    {label: 'More Details / Conditions'},
  ]
  areaTwo = {label: 'Special Instructions'}
  row
  content
  item: Item
  imageUrl
  position
  total
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    // this.row = this.store.select(getRow)
    this.row = this.store.select(getDetailsAuxiliar)
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
  }

  resolveValue(key){
    switch (key) {
      case this.areasOne[0].label:
        return !!this.item.description ? this.item.description : ''
      case this.areasOne[1].label:
        return !!this.item.specs ? this.item.specs : ''
      case this.areaTwo.label:
        return !!this.item.product_instructions ? this.item.product_instructions : ''
    }
  }

  insertOn(key, value){
    let aux = new Item().setItem({...this.item})
      aux[key] = value
      this.store.dispatch(loadDialogDetailsSuccess({data: aux}))
  }


}
