import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { shareReplay, tap } from 'rxjs/operators';
import { Item } from 'src/app/model/item';
import { ManagerState } from 'src/app/store';
import { loadDialogDetailsSuccess } from 'src/app/store/Dialogs/dialog.actions';
import { getDetails } from 'src/app/store/Dialogs/dialog.selectors';
import { ITEM_STATUS } from 'src/app/utils/mncTypes-enums';

@Component({
  selector: 'app-item-details-footer',
  templateUrl: './item-details-footer.component.html',
  styleUrls: ['./item-details-footer.component.scss']
})
export class ItemDetailsFooterComponent implements OnInit {
  buttons = [
    {id:'IDW',label: 'Add', color: 'hard-green white w-100 soft-border'},
    {id:'IDW',label: 'Cancel', color: 'hard-red white w-100 soft-border'},
    // {id:'IDW',label: 'Replace', color: 'hard-orange white w-100 soft-border'},
    // {id:'IDW',label: 'Remove', color: 'lavender white w-100 soft-border'},
  ]
  content
  item
  ITEM_STATUS =ITEM_STATUS 
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.content = this.store.select(getDetails)
    .pipe(
      tap(e => this.item = e ),
      shareReplay()
      )
  }

  insertOn(key, value){
    let aux = new Item().setItem({...this.item})
      aux[key] = value
      this.store.dispatch(loadDialogDetailsSuccess({data: aux})) 
  }
  adjustPrice(){
    return Number(this.item.sale_price).toFixed(2)
  }



}
