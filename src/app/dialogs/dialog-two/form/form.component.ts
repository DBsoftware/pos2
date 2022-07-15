import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { shareReplay, switchMap } from 'rxjs/operators';
import { FormAuxiliarService } from 'src/app/services/utils/form-auxiliar.service';
import { ManagerState } from 'src/app/store';
import { getCustomerState } from 'src/app/store/customer/customer.selectors';
import { isACustomer } from 'src/app/store/tables/table-three/table-three.selectors';
import { staticData } from './static-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form = staticData
  isACostumer

  constructor(
    public _formService:FormAuxiliarService,
    private store: Store<ManagerState>
    ){}

  ngOnInit(): void {
    this._formService.form = this.form
    this._formService.crossroads = false
    this._formService.OnInit()
    this.isACostumer = this.store.select(getCustomerState)
    .pipe(
      switchMap(e =>  this.store.select(isACustomer,{id: e.customer_phone_number})), 
      shareReplay()
      )
  }

  

}
