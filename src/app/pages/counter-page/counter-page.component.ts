import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { loadCountersSuccess } from 'src/app/store/counter-state/counter.actions';
import { getisSecond, getWay } from 'src/app/store/counter-state/counter.selectors';
import { selectShowcase } from 'src/app/store/items-collection/items-collection.selectors';
import { TableType } from 'src/app/utils/mncTypes-enums';
import { buttonsRow, columnsTableOne, columnsTableTwo } from './static-data';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.scss']
})
export class CounterPageComponent implements OnInit, OnDestroy {
  TableTypeOrders = TableType.ORDERS
  TableTypeItems = TableType.ITEMS
  buttonsRow = buttonsRow
  isList
  columnsTableOne = columnsTableOne
  columnsTableTwo = columnsTableTwo
  showcase
  constructor(private store: Store<ManagerState>) { 
    this.store.dispatch(loadCountersSuccess({value: 'first'}))
  }

  ngOnInit(): void {
    this.isList = this.store.select(getisSecond)
    this.showcase = this.store.select(selectShowcase)

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.store.dispatch(loadCountersSuccess({value: 'first'}))
  }


}

