import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ManagerState } from 'src/app/store';
import { getSelectedItems } from 'src/app/store/selected-order/selected-order.selectors';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  items
  constructor(private store: Store<ManagerState>, private _utils: UtilsService) {
    this._utils.updateSubject.next(true)
   }

  ngOnInit(): void {
    this.items = this.store.select(getSelectedItems)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._utils.updateSubject.next(false)
  }

}
