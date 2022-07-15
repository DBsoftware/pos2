import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import { getisSecond } from 'src/app/store/counter-state/counter.selectors';
import { selectShowcase } from 'src/app/store/items-collection/items-collection.selectors';
import { TableType } from 'src/app/utils/mncTypes-enums';
import { columnsTableOne } from '../counter-page/static-data';
import { columnsTableTwoKitchen } from '../kitchen-page/static-data';
import { longHeaderData, buttonsRow } from './static-data';



@Component({
  selector: 'app-kitchen-page',
  templateUrl: './kitchen-page.component.html',
  styleUrls: ['./kitchen-page.component.scss']
})
export class KitchenPageComponent implements OnInit {
  TableTypeORDERS = TableType.ORDERS
  TableTypeITEMS = TableType.ITEMS
  longHeaderData = longHeaderData
  buttonsRow = buttonsRow
  columnsTableOne = columnsTableOne
  columnsTableTwoKitchen = columnsTableTwoKitchen
  isList
  showcase
  filterButtons  = [
    {label :'Current Orders', color: 'purple'},
    {label :'Order History', color: 'blue'},
    {label :'Bar', color: 'yellow'},
    {label :'Menu', color: 'orange'},
  ]

  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.isList = this.store.select(getisSecond)
    this.showcase = this.store.select(selectShowcase)

  }

}
