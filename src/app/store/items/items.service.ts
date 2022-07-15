import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManagerState } from '..';
import { loadDialogDetailsSuccess, loadDialogDetailsSuccessOnCall } from '../Dialogs/dialog.actions';
import { loadActivePositionSuccess, loadActiveRowsSuccess, loadTotalSuccess } from './items.actions';

@Injectable({
  providedIn: 'root'
})
export class ItemsStoreService {

  constructor(private store: Store<ManagerState>) { }

  activeItem(total, row, position, product){
    this.store.dispatch(loadTotalSuccess({data: total})) 
    !!row ? this.store.dispatch(loadActiveRowsSuccess({data: row})) :null
    this.store.dispatch(loadActivePositionSuccess({data: position})) 
    this.store.dispatch(loadDialogDetailsSuccessOnCall({data: product})) 
  }
}
