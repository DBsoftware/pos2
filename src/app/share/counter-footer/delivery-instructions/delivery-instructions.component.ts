import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { shareReplay, tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { ManagerState } from 'src/app/store';
import { loadSelectedOrdersSuccess } from 'src/app/store/selected-order/selected-order.actions';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
@UntilDestroy()
@Component({
  selector: 'app-delivery-instructions',
  templateUrl: './delivery-instructions.component.html',
  styleUrls: ['./delivery-instructions.component.scss']
})
export class DeliveryInstructionsComponent implements OnInit {
  @Input() isCounter = true
  buttonsOriginal = [
    { color: 'hard-purple white w-100', label: 'Pay for Order'},
    { color: 'hard-blue white w-100', label: 'Print Order'}
  ]
  buttons = this.buttonsOriginal[0]
  orderSelected
  order
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.store.select(getSelected)
    .pipe(untilDestroyed(this),
    tap(e => this.orderSelected = e),
    )
    .subscribe()
  }

    
  insertOnSelected(value){
    let aux = new Order().setOrder({...this.orderSelected})
    aux['order_instructions'] = value
    this.store.dispatch(loadSelectedOrdersSuccess({data: aux}))
  }

}
