import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Item } from 'src/app/model/item';
import { ManagerState } from 'src/app/store';
import { loadDialogDetailsSuccess } from 'src/app/store/Dialogs/dialog.actions';
import { getDetails } from 'src/app/store/Dialogs/dialog.selectors';
import { ITEM_STATUS } from 'src/app/utils/mncTypes-enums';
import { UtilsService } from '../../../services/utils/utils.service';

@UntilDestroy()
@Component({
  selector: 'app-details-dialog-footer',
  templateUrl: './details-footer.component.html',
  styleUrls: ['./details-footer.component.scss']
})
export class DetailsDialogFooterComponent implements OnInit {
  item
  ITEM_STATUS = ITEM_STATUS
  content
  actionButtons = [
    {
      label: 'add',
      color: 'hard-red white w-100'
    },
    {
      label: 'cancel',
      id: 'Details',
      color: 'hard-green white w-100'
    }
  ]
  actionButtonsOndisable = [
    {
      label: 'Activate',
      color: 'hard-red white w-100'
    },
    {
      label: 'cancel',
      id: 'Details',
      color: 'hard-green white w-100'
    }
  ]
  actionButtonsUpdates = [
    {id:'qty',label: 'Update', color: 'hard-green white w-100'},
    {
      label: 'Cancel',
      id: 'Details',
      color: 'hard-red white w-100'
    }
  ]
  disable = {
    label: 'Disable',
    color: 'hard-purple white w-100 p-0',
    icon: 'disabled_visible'
  }
  buttons
  isUpdate
  @Output() closeEvent = new EventEmitter
  constructor(private store: Store<ManagerState>, private _utils:UtilsService) {
    this.content = this.store.select(getDetails)
    .pipe(
      shareReplay(),
      tap(e => {
        this.item = e
      } ),
      )
  }

  ngOnInit(): void {
    this._utils.updateSubjectObservable()
    .pipe(untilDestroyed(this))
    .pipe(switchMap(e => this.store.select(getDetails)
    .pipe(tap(item => {
      this.isUpdate = e
      this.buttons = (e)?
      this.actionButtonsUpdates:
      ((item.productStatus == ITEM_STATUS.active)? this.actionButtons : this.actionButtonsOndisable)
    }))
    ),
    ).subscribe()

    this.content = this.store.select(getDetails)
    .pipe(
      shareReplay(),
      tap(e => {
        this.item = e
      } ),
      )
  }

  sendClose(){
    this.closeEvent.emit()
    this._utils.updateSubject.next(false)
  }

  insertOn(value){
    let aux = new Item().setItem({...this.item})
      aux['product_qty'] = value
      this.store.dispatch(loadDialogDetailsSuccess({data: aux}))
  }

}
