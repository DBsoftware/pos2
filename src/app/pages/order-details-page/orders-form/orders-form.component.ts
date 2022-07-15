import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { FormService } from 'src/app/services/utils/form.service';
import { ManagerState } from 'src/app/store';
import { getSelectedOrdernumber, getSelectedOrderType, getSelectedOrderTypeIsDelivery } from 'src/app/store/selected-order/selected-order.selectors';
import { ORDERTYPEEnum } from 'src/app/utils/mncTypes-enums';
import { optionForm } from './static-data';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit, OnDestroy {
  form: any = this.requireFields( optionForm[ORDERTYPEEnum.DINE_IN], ORDERTYPEEnum.DINE_IN)
  orderNumber
  isDeliver
  formFields = optionForm
  options
  constructor(public _formService:FormService, private store: Store<ManagerState> ){}

  ngOnInit(): void {
    this.store.select(getSelectedOrderType)
    .pipe(tap(e => {
      this.isDeliver = e.includes(ORDERTYPEEnum.Delivery) || e.includes(ORDERTYPEEnum.Pick_Up)
      this.form = this.requireFields(optionForm[e], e)
    }))
    .subscribe(e => {
      this._formService.form = this.form
      this._formService.OnInit()
      this.orderNumber = this.store.select(getSelectedOrdernumber)
    })
  }

  resolveClass(obj, last){
    if (last && !this.isDeliver) return  'inputti3'
    let {type, label} =obj
    return (type.includes('select')) ? (label.includes('Type of order')?'selectTypeOrder':'selectti' )
    :(label.includes('Delivery Due Date/Time')?'inputti':'inputti2' )
    }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._formService.form = null
  }


  requireFields(aux, id){
    return aux.map(e =>
      Object.keys(e).map(it =>
        this.setRequire(it, e[it], id)).reduce((total, curr) =>({...total, ...curr}), {})
       )
  }

  setRequire(key, value, id){
    return {[key]: {...value, require: value.require.includes(id), label: value.label + (value.require.includes(id)?'*':'')}}
  }


}







