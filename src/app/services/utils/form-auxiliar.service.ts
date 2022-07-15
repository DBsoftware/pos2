import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Customer } from 'src/app/model/customer';
import { ManagerState } from 'src/app/store';
import { loadCustomerFormValidation, loadCustomers, loadCustomersSuccess } from 'src/app/store/customer/customer.actions';
import { FormService } from './form.service';

@Injectable({
  providedIn: 'root'
})
export class FormAuxiliarService extends FormService {

  constructor(
    public formBuilder: FormBuilder,
    protected store: Store<ManagerState> 
  ) { 
    super(formBuilder, store)
  }

  insertOnSelectedCustomer(key){
    let aux = new Customer().setNewCustomer(this.orderSelected)
    aux[key] = this.OrderForm.get(key).value
    this.store.dispatch(loadCustomerFormValidation({data: this.OrderForm.valid}))
    // if(!aux[key] || aux[key].includes('null')) return
    this.store.dispatch(loadCustomersSuccess({data: aux}))
  }
}
