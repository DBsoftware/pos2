import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { ManagerState } from 'src/app/store';
import { loadSelectedOrdersSuccess } from 'src/app/store/selected-order/selected-order.actions';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { ORDERTYPE, ORDERTYPEEnum } from 'src/app/utils/mncTypes-enums';
import { totalTypes } from './static-data';
@UntilDestroy()
@Component({
  selector: 'app-total-section',
  templateUrl: './total-section.component.html',
  styleUrls: ['./total-section.component.scss']
})
export class TotalSectionComponent implements OnInit {
  items = [
    // {type: 'input',label: 'Delivery Address line one', key: 'delivery_address_1'},
    // {type: 'input',label: 'Delivery Address line two', key: 'delivery_address_2'},
    // {type: 'input',label: 'Zipcode', key: 'zipcode_name'},
    // {type: 'input',label:'Delivery Due Date/Time', key: 'order_due_date'},
    {type: 'area',label: 'Order/Delivery Instructions', key: 'order_instructions'}
  ]
  totalTypes = totalTypes
  orderSelected: Order
  ORDERTYPEEnum = ORDERTYPEEnum
  constructor(private store: Store<ManagerState>) { }

  ngOnInit(): void {
    this.store.select(getSelected)
    .pipe(untilDestroyed(this),tap(e => this.orderSelected = e))
    .subscribe()
  }

  resolveTextAreas(label){
    switch (label) {
      case 'Delivery Address line one':
        return  (!!this.orderSelected.delivery_address_1 ? this.orderSelected.delivery_address_1 : ``)
      case 'Delivery Address line two':
        return  (!!this.orderSelected.delivery_address_2 ? this.orderSelected.delivery_address_2 : ``)
      case 'Zipcode':
        return  (!!this.orderSelected.zipcode_name ? this.orderSelected.zipcode_name : ``)
      case 'Delivery Due Date/Time':
        return  (!!this.orderSelected.order_due_date ? this.orderSelected.order_due_date : moment().add(10,'m').format('YYYY-MM-DD HH:mm:ss'))
      case 'Order/Delivery Instructions':
        return  !!this.orderSelected.order_instructions ? this.orderSelected.order_instructions : ``
      default:
        return ''
    }
  }

  setData(label: string){
    label = label.replace('-','_').replace(' ','_')
    return {
      Total_items: (!!this.orderSelected.subTotalItems ? this.orderSelected.subTotalItems : `${(0.0).toFixed(2)}`),
      Sub_Total: (!!this.orderSelected.subTotalItems ? this.orderSelected.subTotalItems : `${(0.0).toFixed(2)}`),
      Total: (!!this.orderSelected.orderTotal ? this.orderSelected.orderTotal : `${(0.0).toFixed(2)}`),
      Delivery_Fee: `${(!!this.orderSelected.delivery_fee ? Number(this.orderSelected.delivery_fee).toFixed(2) : (0.0).toFixed(2))}`,
      Service_Fee: `${(!!this.orderSelected.delivery_fee ? Number(this.orderSelected.delivery_fee).toFixed(2) : (0.0).toFixed(2))}`,
      Taxes: `${(!!this.orderSelected.tax ? Number(this.orderSelected.tax).toFixed(2) : (0.0).toFixed(2))}`,
      Tip: `${(!!this.orderSelected.order_tip ? Number(this.orderSelected.order_tip).toFixed(2) : (0.0).toFixed(2))}`
    }[label]
  }

  insertOnSelected(event, key){
    let {target: {value}} = event
    let aux = new Order().setOrder({...this.orderSelected})
    aux[key] = value
    this.store.dispatch(loadSelectedOrdersSuccess({data: aux}))
  }

}
