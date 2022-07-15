import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { ManagerState } from 'src/app/store';
import { preLoadTableSeatingAreaSuccess } from 'src/app/store/auxiliars/auxiliars.actions';
import { getDeliveriesMethods, getSeatingAreas, getTablesSeatingAreas } from 'src/app/store/auxiliars/auxiliars.selectors';
import { getCustomerState } from 'src/app/store/customer/customer.selectors';
import { loadFormValidation, loadSelectedOrdersSuccess } from 'src/app/store/selected-order/selected-order.actions';
import { getSelected } from 'src/app/store/selected-order/selected-order.selectors';
import { TypeofOrder } from 'src/app/utils/static-data';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  OrderForm: FormGroup;
  orderSelected
  form
  crossroads = true
  keys =[]
  init = true
  constructor(
    public formBuilder: FormBuilder,
    protected store: Store<ManagerState>    ) {
      this.crossroads = true
    }

    OnInit(): void {
      this.keys = []
      let formObj = {}
      this.form.forEach(e => {
        Object.keys(e).forEach(element => {
          formObj[e[element].key] = this.field(e[element].require, e[element].key.includes('order_date'))
          this.keys.push(e[element].key)
        })
      })
      console.log('formulario',this.form, formObj)
      this.OrderForm = this.formBuilder.group(formObj);
      this.resolveSelection()
      this.OrderForm.reset(this.OrderForm.value)
      this.store.dispatch(loadFormValidation({data: this.OrderForm.valid}))
    }

    resolveSelection(){
      if(this.crossroads){
        this.store.select(getSelected)
          .pipe(
            filter(e => !!this.OrderForm && !!e),
            tap(order => {
              this.orderSelected = order
              if(!!this.orderSelected['seating_area_id'] && this.init) {
                  this.init =false
                  this.store.dispatch(preLoadTableSeatingAreaSuccess({data: this.orderSelected['seating_area_id']}))
                }
              this.keys.forEach(e => {
                this.OrderForm.get(e).setValue(this.orderSelected[e])
              })
            }),
            ).subscribe()
      } else {
        this.store.select(getCustomerState)
        .pipe(
          filter(e => !!this.OrderForm && !!e),
          tap(order => {
            this.orderSelected = order
            this.keys.forEach(e => {
              this.OrderForm.get(e).setValue(this.orderSelected[e])
            })
          }),
          ).subscribe()
      }
    }

    returnObjectKeys(aux){
      return Object.keys(aux)
    }

  resolveList(key){
    switch (key) {
      case 'location_table_id':
        return this.store.select(getTablesSeatingAreas)
      case 'seating_area_id':
        return this.store.select(getSeatingAreas)
      case 'delivery_id':
        return this.store.select(getDeliveriesMethods)
      case 'order_type_id':
        return of(TypeofOrder)
      default:
        return of([]);
    }
  }
  resolveLabel(key){
    switch (key) {
      case 'location_table_id':
        return 'location_table_name'
      case 'seating_area_id':
        return 'section_name'
      case 'order_type_id':
        return 'section_name'
      case 'delivery_id':
        return 'label'
      default:
        return '';
    }
  }

  insertOnSelected(key){
    let aux = new Order().setOrder(this.orderSelected)
    aux[key] = this.OrderForm.get(key).value
    this.store.dispatch(loadFormValidation({data: this.OrderForm.valid}))
    // if(!aux[key] || aux[key].includes('null')) return
    this.store.dispatch(loadSelectedOrdersSuccess({data: aux}))
  }

  onchange(data){
    if(data.includes('null')) return
    this.insertOnSelected('seating_area_id')
    this.store.dispatch(preLoadTableSeatingAreaSuccess({data}))
    this.OrderForm.get('location_table_id').setValue('')
    this.insertOnSelected('location_table_id')
  }
  field(require, date){
    let aux =[]
    if (date) aux.push(moment().format('YYYY-MM-DD hh:mm'))
    else  aux.push('')
    if(require) aux.push( Validators.compose([Validators.required]))
    return aux
  }
}
