import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getSeatingAreasSectionName } from 'src/app/store/auxiliars/auxiliars.selectors';
import { getSelected, getSelectedItemsDone } from 'src/app/store/selected-order/selected-order.selectors';
import { getUserName, getUserState } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  orderSelected
  user
  items
  areas
  userName
  date = moment().format('YYYY-MM-DD HH:mm:ss')
  constructor(private store:Store<ManagerState>) { }

  ngOnInit(): void {
    this.orderSelected =  this.store.select(getSelected)
          .pipe(tap(e => {
            this.areas = this.store.select(getSeatingAreasSectionName, {id: e.seating_area_id})
          }))
    this.user = this.store.select(getUserState)
    this.userName = this.store.select(getUserName)
    this.items = this.store.select(getSelectedItemsDone)
  }

}
