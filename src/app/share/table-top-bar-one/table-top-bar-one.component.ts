import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import { selectTotalOrdersOnTableLabel } from 'src/app/store/tables/table-one/table-orders.selectors';
import { getSubtitle } from '../../store/counter-state/counter.selectors';

@Component({
  selector: 'app-table-top-bar-one',
  templateUrl: './table-top-bar-one.component.html',
  styleUrls: ['./table-top-bar-one.component.scss']
})
export class TableTopBarOneComponent implements OnInit {
  @Input() isCounter = true
  Upperlabels
  @Input() filterButtons  = [
    {label :'Current Orders', color: 'purple'},
    {label :'Order History', color: 'blue'},
    {label :'Bar', color: 'yellow'},
    {label :'Reservations', color: 'yellow'},
    {label :'Menu', color: 'orange'},
  ]
  flag
  @Input() messageButton = {color: 'yellow', label: 'Messages'}
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.Upperlabels = this.store.select(selectTotalOrdersOnTableLabel)
    this.flag = this.store.select(getSubtitle)
  }

  resolveSubtitle(){

  }

}
