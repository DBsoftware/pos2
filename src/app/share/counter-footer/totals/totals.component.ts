import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { shareReplay, tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { ManagerState } from 'src/app/store';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { totalTypes } from './static-data';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {
  totalTypes = totalTypes
  @Input() isCounter = true
  orderSelected: Order
  acumulate = {}
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.store.select(getSelected)
    .pipe(tap(e => this.orderSelected = e))
    .subscribe()
  }

  setData(label){

    switch (label) {
      case 'Subtotal':
        return  (!!this.orderSelected.subTotalItems ? this.orderSelected.subTotalItems : `${(0.0)}`)
      case 'Order Total':
        return  (!!this.orderSelected.orderTotal ? this.orderSelected.orderTotal : `${(0.0)}`)
      case 'Delivery Fee':
        return  `${(!!this.orderSelected.delivery_fee ? Number(this.orderSelected.delivery_fee) : (0.0))}`
      case 'Taxes':
        return  `${(!!this.orderSelected.tax ? Number(this.orderSelected.tax) : (0.0))}`
      case 'Tip':
        return  `${(!!this.orderSelected.order_tip ? Number(this.orderSelected.order_tip) : (0.0))}`
      default:
        return 0.0
    }

  }



}
