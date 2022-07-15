import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { ManagerState } from 'src/app/store';
import { loadSelectedOrdersSuccess } from 'src/app/store/selected-order/selected-order.actions';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { CardTypesLabels, CardTypes } from 'src/app/utils/cardTypes.enum';
import { DialogOneComponent } from '../dialog-one/dialog-one.component';
@UntilDestroy()
@Component({
  selector: 'app-manual-pay',
  templateUrl: './manual-pay.component.html',
  styleUrls: ['./manual-pay.component.scss']
})
export class ManualPayComponent implements OnInit {
  CardTypesLabels = CardTypesLabels
  CardTypes = CardTypes
  fieldsOne = [
    {readonly: false,key: 'order_tip', label: 'Adjusted Tip'},
    {readonly: true,key: 'order_total', label: 'Total Paid'},
  ]
  fieldsTwo = [
    ...this.fieldsOne,
    {readonly: false,key: 'credit_card_type_id', label: 'Credit card type'},
    {readonly: false,key: 'order_last4', label: 'Last 4 on Card'},
    {readonly: false,key: 'order_approval', label: 'Approval No'},
  ]
  fields = []

  buttonsFooter =  [
    {
        label: 'Cancel',
        color: 'hard-red white w-100',
        id: 'pay'
    },
    {
        label: 'Save',
        color: 'hard-green white w-100',
        id: 'pay'
    },

]
qr =    {
  label: 'Pay with QR',
  color: 'hard-green white w-100'
}
orderSelected: Order

  constructor(private store: Store<ManagerState>,
    public dialogRef: MatDialogRef<DialogOneComponent>,) { }

  ngOnInit(): void {
    this.store.select(getSelected)
    .pipe(untilDestroyed(this),
    tap(e => this.orderSelected = e),
    tap(e => this.fields = (!!e && e.order_cash_flag )?( e.order_cash_flag.includes('false')? this.fieldsTwo: this.fieldsOne): [])
    )
    .subscribe()
  }
  close(){
    this.dialogRef.close()
  }

  changesFun(value){
    if(value.includes('null')) return
    this.fields = value.includes('false')? this.fieldsTwo: this.fieldsOne
    let aux = new Order().setOrder({...this.orderSelected})
    aux['order_cash_flag'] = value
    this.store.dispatch(loadSelectedOrdersSuccess({data: aux}))
  }

  insertOnSelected(event, key){
    let {target: {value}} = event
    this.updateField(key, value)
  }

  resolveValue(label){
    switch (label) {
      case 'Total Paid':
        return this.orderSelected.orderTotal
      case 'Adjusted Tip':
        return this.orderSelected.order_tip
      case 'Last 4 on Card':
        return this.orderSelected.order_last4
      case 'Credit card type':
        return this.orderSelected.credit_card_type_id
      case 'Approval No':
        return this.orderSelected.order_approval
      default:
        return undefined;
    }
  }

  calculateTip(value){
    this.updateField('order_tip', (value * (this.orderSelected.totalNoTip) / 100).toFixed(2))
  }

  updateField(key, value){
    let aux = new Order().setOrder({...this.orderSelected})
    aux[key] = value
    this.store.dispatch(loadSelectedOrdersSuccess({data: aux}))
  }

  formatLabel(value){
    return value.replace('_', '')
  }

}
