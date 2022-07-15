import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { of } from 'rxjs';
import { ManagerState } from 'src/app/store';
import { ValidatorsService } from './validators.service';
import { loadFormsValue, loadFormsStatus } from '../../store/form/form.actions';
import { TypeofOrder } from '../../utils/static-data';
import { getDeliveriesMethods, getSeatingAreas, getTablesSeatingAreas, getAssigns, getPromos } from '../../store/auxiliars/auxiliars.selectors';
import { preLoadTableSeatingAreaSuccess } from '../../store/auxiliars/auxiliars.actions';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  FormGroup: FormGroup;
  orderSelected
  form
  crossroads = true
  keys =[]
  init = true
  static hours =  new Array(24).fill(0)
  .map((e,i) => `${i + 1} hour${i == 0?'':'s' } before`)
  .map((e,i)=> ({label: e, value: `${i + 1}`}))
  constructor(
    public formBuilder: FormBuilder,
    protected store: Store<ManagerState>)
    {
      this.crossroads = true
    }

    OnInit(): void {
      this.keys = []
      let formObj = {}
      this.form.forEach(e => {
        formObj[e.key] = this.field(e.label, e.key.includes('date'), e.key.includes('also'), e.key.includes('email'))
        this.keys.push(e.key)
      })
      this.FormGroup = this.formBuilder.group(formObj);
      this.FormGroup.reset(this.FormGroup.value)

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
        case 'assign':
          return 'label'
        default:
          return 'label';
      }
    }

    resolveList(key, dependency = null){
      switch (key) {
        case 'location_table_id':
          return this.store.select(getTablesSeatingAreas)
        case 'seating_area_id':
          return this.store.select(getSeatingAreas)
        case 'assign':
          return this.store.select(getAssigns)
        case 'promo':
          return this.store.select(getPromos)
        case 'delivery_id':
          return this.store.select(getDeliveriesMethods)
        case 'order_type_id':
          return of(TypeofOrder)
        case 'calendar_reminder_email_when':
          return of(FormService.hours)
        case 'calendar_reminder_phone_when':
          return of(FormService.hours)
        default:
          return of([]);
        }
    }

    returnObjectKeys(aux){
      return Object.keys(aux)
    }


    insertOnSelected(){
      this.store.dispatch(loadFormsValue({data: this.FormGroup.value}))
      this.store.dispatch(loadFormsStatus({data: this.FormGroup.valid}))
   }

   onchange(data){
    if(!data || data.includes('null')) return
    // this.insertOnSelected('seating_area_id')
    this.store.dispatch(preLoadTableSeatingAreaSuccess({data}))
    this.FormGroup.get('location_table_id').setValue('')
    // this.insertOnSelected('location_table_id')
  }

  // onchange(data, value, depedent){
  //   this.insertOnSelected()
  //     // if(data.includes('companyType')) {
  //     //   this.store.dispatch(loadSubcats({data: value}))
  //     // }
  //     // if(data.includes('state')) {
  //     //   this.store.dispatch(loadCities({data: value}))
  //     // }
  //     // if(data.includes('city')) {
  //     //   this.store.dispatch(loadZips({data: value}))
  //     // }
  //     if(depedent) this.FormGroup.get(depedent).reset()
  // }

  field(require, date, also, mail){

    let aux =[]
    if (date) aux.push(moment().format('YYYY-MM-DD hh:mm'))
    else  aux.push('')
    if(!!mail && require.includes('*'))  aux.push( Validators.compose([Validators.required,ValidatorsService.emailValidator]))
    if(!!mail && !require.includes('*'))  aux.push( Validators.compose([ValidatorsService.emailValidator]))
    if(also) aux.push( Validators.compose([ValidatorsService.alsoValidatorQty, ValidatorsService.AllMailsValidator]))
    if(require.includes('*') && !mail) aux.push( Validators.compose([Validators.required]))
    console.log(require.includes('*'), date, also, mail, 'here', aux)
    return aux
  }

  cleanAddress() {
    ['line1', 'line2', 'zipcode', 'city', 'state']
    .forEach(e => {
      this.FormGroup.get(e).reset()
    })
    this.insertOnSelected()
  }


  call(key){
    window.open(`tel:+1${this.FormGroup.get(key).value}`)
  }

  send(key){
    window.open(`mailto:${this.FormGroup.get(key).value}`)
  }

}

