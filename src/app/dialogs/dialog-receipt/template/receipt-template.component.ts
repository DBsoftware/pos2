import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { ManagerState } from 'src/app/store';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { getUserState } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-receipt-template',
  templateUrl: './receipt-template.component.html',
  styleUrls: ['./receipt-template.component.scss']
})
export class ReceiptTemplateComponent implements OnInit {
  orderSelected
  user
  orderTotal
  date = moment().format('MM-DD-YYYY HH:mm:ss')
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.orderSelected =  this.store.select(getSelected)
                          .pipe(tap(e => this.orderTotal = e.totalNoTip))
    this.user = this.store.select(getUserState)
  }

  calculateTip(value){
      return ((value * this.orderTotal)/100)
  }

  calculateTipTotal(value){
    return this.orderTotal + Number(this.calculateTip(value))
  }

  twoDecimals(value: Number){
    return value.toFixed(2)
  }



}
