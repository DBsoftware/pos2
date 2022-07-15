import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, switchMap, take, tap} from 'rxjs/operators';
import { Order } from '../../model/order';
import { ManagerState } from '../../store';
import { getDetails } from '../../store/Dialogs/dialog.selectors';
import { getFormValidation, getSelected } from '../../store/selected-order/selected-order.selectors';
import { getUserState } from '../../store/user/user.selectors';
import { selectCollection } from '../../store/items-collection/items-collection.selectors';
import { RequestService } from '../api/request.service';
import { ResponseService } from '../api/response.service';
import { getCustomerState, getCustomerFormValidation } from 'src/app/store/customer/customer.selectors';
import { getFisrtMessage } from 'src/app/store/chat/chat.selectors';
import { getFormValid, getFormValue } from '../../store/form/form.selectors';
import { getCa } from 'src/app/store/auxiliars/auxiliars.selectors';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  orderSelected: Order
  payload
  user_info
  flag
  itemsCollection
  customerInfo
  customerValid
  message
  formValue
  formValid
  calendarList
  constructor(
    protected store: Store<ManagerState>,
    protected _responseService: ResponseService,
    protected _requestService: RequestService
    ) { }

  storeSelect(selection){
    return this.store.select(selection).pipe(take(1))
  }

  getOrderSelected(){
    this.storeSelect(getSelected)
    .subscribe(e => this.orderSelected = e)
  }
  getCa(){
    this.storeSelect(getCa)
    .subscribe((e: Array<any>) => this.calendarList = e)
  }
  getfirstMessage(){
    this.storeSelect(getFisrtMessage)
    .subscribe(e => this.message = e)
  }
  getFormValue(){
    this.storeSelect(getFormValue)
    .subscribe(e => this.formValue = e)
  }
  getFormValid(){
    this.storeSelect(getFormValid)
    .subscribe(e => this.formValid = e)
  }
  getCustomer(){
    this.storeSelect(getCustomerState)
    .subscribe(e => this.customerInfo = e)
  }
  getCustomerValidation(){
    this.storeSelect(getCustomerFormValidation)
    .subscribe(e => this.customerValid = e)
  }
  getItemsCollection(){
    this.storeSelect(selectCollection)
    .subscribe(e => this.itemsCollection = e)
  }

  getPayload(){
    this.storeSelect(getDetails)
    .subscribe(e => this.payload = e)
  }
  getStoreUserState(){
    this.storeSelect(getUserState)
    .subscribe(e => this.user_info = e)
  }

  getStoreFormValidation(){
    this.store.select(getFormValidation)
    .subscribe(e => this.flag = e)
  }

  storeDipatch(dispatch, call = null, state = 0){
    dispatch.forEach(element => {
      this.store.dispatch(element)
    });
    if(call) this.callRequestService(call)
    return state
  }

  callRequestService(obj, state = 0){
    this._requestService.buildRequestWithSubcription(Array.isArray(obj) ?obj: [obj])
    return state
  }
  callRequestServiceNoSubcription(obj, state = 0){
    return this._requestService.buildRequest(Array.isArray(obj) ?obj: [obj])
  }

  dispatchAfter(obj, dispatch, state = 0){
    this._requestService.buildRequest( Array.isArray(obj) ?obj: [obj])
    .subscribe(e => this.storeDipatch(dispatch))
    return state
  }
  dispatchAfterResposeId(obj,item,dispatchFuntion, aux = null,state = 0){
    this._requestService.buildRequest(Array.isArray(obj) ?obj: [obj])
    .pipe(switchMap(e => {
      console.log('here', e)
      return this._responseService.checkResponseIDObservable()}),
      )
    .subscribe(e => {
      console.log('respuesta', dispatchFuntion, item, e)
      this.storeDipatch(dispatchFuntion(item,aux ,e.order_detail_id))

    })
    return state
  }


}
