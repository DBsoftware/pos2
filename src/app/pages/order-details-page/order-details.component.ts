import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';
@UntilDestroy()
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  ordernumber
  constructor(private store: Store<ManagerState>) { 
  }

  ngOnInit(): void {
    this.ordernumber = this.store.select(getSelectedOrdernumber)
  }

}
