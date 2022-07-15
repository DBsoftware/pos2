import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ManagerState } from 'src/app/store';
// import { FormService } from '../../../../../../utils/form.service';
// import { getFormValue } from '../../../../../../store/form/form.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {  zip } from 'rxjs';
import { delay, tap, map, take, switchMap, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormService } from 'src/app/services/utils/form2.service';
import { getFormValue } from 'src/app/store/form/form.selectors';
import { getCustomerState } from 'src/app/store/customer/customer.selectors';
import { Customer } from 'src/app/model/customer';
import { preLoadTableSeatingAreaSuccess } from '../../../../store/auxiliars/auxiliars.actions';
import { loadFormsValue } from '../../../../store/form/form.actions';
import { getSelectedCa } from 'src/app/store/auxiliars/auxiliars.selectors';
import { Calendar } from 'src/app/model/calendar';
@UntilDestroy()
@Component({
  selector: 'restaurant-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  // buttons = [Buttons.Cancel, Buttons.set_appointment, Buttons.share]
  // buttonsUP = [Buttons.Add_new_appoiment]
  date = moment().format('MMMM D, YYYY')
  reservationId = undefined
  selected =null
  payload
  Buttons = [
    {label :'Go Back', size : "100", color: 'hard-green white w-100'},
    {label: "Customer Lookup", size : "100", color: 'hard-blue white w-100'},
    {label :'New Appoiment', size : "100", color: 'hard-orange white w-100'},
    {label :'Save Appoiment Information', size : "100", color: 'hard-purple white w-100'},
    {label :'Cancel', size : "100", color: 'hard-red white w-100', id: "sch"},
    {label :'Delete', size : "100", color: 'hard-red white w-100', id: "sch"},
  ]
  data = [
    {cantHide:true,type: 't',key: 'calendar_startHour',label: "Start*", size : "20"},
    {cantHide:true,type: 't',key: 'calendar_endHour',label: "Stop*", size : "20"},
    {cantHide:true,type: 's',key: 'order_type_id',label: "Dining Method", size : "50"},
    {cantHide:true,type: 's',key: 'seating_area_id',label: "Area", size : "20"},
    {cantHide:true,type: 'i',key: 'number_people',label: "Number of people*", size : "40"},
    {cantHide:true,type: 'r',key: 'wheelchair',label: "wheelchair access", size : "30"},
    {cantHide:true,type: 's',key: 'location_table_id',label: "Table", size : "20"},
    {cantHide:true,type: 'i',key: 'number_children',label: "Number of children*", size : "40"},
    {cantHide:true,type: 'r',key: 'child_seating',label: "Needs child seating", size : "30"},
    // {cantHide:true,type: 'b',key: 'look_up',label: "Customer Lookup", size : "100", color: 'hard-green white w-100'},
    {cantHide:true,type: 'i',key: 'fullName',label: "Name*", size : "50"},
    {cantHide:true,type: 'p',key: 'customer_phone_number',label: "Phone*", size : "45", sizexs: "100"},
    {cantHide:true,type: 'i',key: 'email',label: "Email*", size : "100", sizexs: "100"},
    {cantHide:true,type: 'i',key: 'email2',label: "Second Email", size : "100", sizexs: "100"},
    {cantHide:true,type: 's',key: 'assign',label: "Assign", size : "46"},
    {cantHide:true,type: 's',key: 'promo',label: "Promo", size : "47"},
    {cantHide:true,type: 'a',key: 'special_request',label: "Special Request", size : "100"},
    {cantHide:true,type: 'a',key: 'notes',label: "Notes", size : "100"},
    // {cantHide:true,type: 'a',key: 'customer_history',label: "Customer History", size : "100"},
  ]
  showReminder = false
  showAdd = false
  formValue
  selectedCa: Calendar;
  constructor(
    private store: Store<ManagerState>,
    public activatedRoute:ActivatedRoute,
    public _formService: FormService) {
      this._formService.form = this.data
      this._formService.FormGroup = null
      this._formService.OnInit()
      this.getSelectedData()
      this.getSelectedCaData()
    }

  ngOnInit(): void {
    // this._formService.FormGroup.get('reminder')
    // .valueChanges.pipe(filter(e => typeof e === 'boolean'),tap(e => console.log('here', e)))
    // .subscribe(e => this.showReminder = e)
    this.activatedRoute.paramMap
    .pipe(
      tap(e => {
        this.date = !!e.get('date') ? moment(e.get('date')).format('MMMM D, YYYY'):this.date
        this.reservationId = !!e.get('id') ?e.get('id'):undefined
        this.payload = {date: this.date, reservationId: this.reservationId}
      }
        ),
       )
    .subscribe()
    this.store.dispatch(loadFormsValue({data: this._formService.FormGroup.value}))
    this.store.select(getFormValue)
    .pipe(
    take(1),
    tap(e => this.formValue = e),
    tap(this.loadForm.bind(this)))
    .subscribe()
  }

  getSelectedData(){
    this.store.select(getCustomerState)
    .pipe(untilDestroyed(this),
      tap(e => this.selected = new Customer().setNewCustomer(e)),
      tap(e => console.log("here",e)),
      tap(e => this.store.dispatch(loadFormsValue({data: {...this.selected, fullName: this.selected.fullName }})))
    )
    .subscribe()
  }
  getSelectedCaData(){
    this.store.select(getSelectedCa)
    .pipe(untilDestroyed(this),
    filter(e => !!e),
      tap(e => this.selected = new Calendar().setAppoiment(e)),
      tap(e => console.log("here",e)),
      tap(e => {
        if(!!this.selected['seating_area_id']) {
            this.store.dispatch(preLoadTableSeatingAreaSuccess({data: this.selected['seating_area_id']}))
          }
      }),
      tap(this.loadForm.bind(this))
    )
    .subscribe()
  }



  loadForm() {
    let it = this.formValue
    let aux = {}
      Object.keys(this._formService.FormGroup.value).forEach(e => {
        aux[e] = !!this.selected[e] ?this.selected[e]:(!!it && !!it[e]? it[e]: '')
      })
      this._formService.FormGroup.setValue(aux)
  }

}
