import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { Customer, Note } from 'src/app/model/customer';
import { DeliveryMethods } from 'src/app/model/delivery-options';
import { Item } from 'src/app/model/item';
import { NmcMessage } from 'src/app/model/nmc_message';
import { loadChatsSuccess } from 'src/app/store/chat/chat.actions';
import { loadCustomersNotesSuccess } from 'src/app/store/customer/customer.actions';
import { loadDialogDetailsAuxiliarSuccess } from 'src/app/store/Dialogs/dialog.actions';
import { loadTableFourths } from 'src/app/store/tables/table-fourth/table-fourth.actions';
import { loadMessagesTables } from 'src/app/store/tables/table-messages/messages-table.actions';
import { loadTableThrees } from 'src/app/store/tables/table-three/table-three.actions';
import { deserialize } from 'typescript-json-serializer';
import { Business } from '../../model/business';
import { Category } from '../../model/category';
import { OperationResult } from '../../model/operation-result';
import { Order } from '../../model/order';
import { Assigns, Promo, SeatingArea, Table } from '../../model/seating-area';
import { ManagerState } from '../../store';
import { ClearErrorsSuccess,
  loadAssignsSuccess,
  loadDeliveryMethodsSuccess,
  loadErrorsSuccess,
  loadGlobalAuxiliars,
  loadPromotionsSuccess,
  loadSeatingAreaSuccess,
  loadTableSeatingAreaSuccess } from '../../store/auxiliars/auxiliars.actions';
import { loadAdBanner, loadItemsCollectionsSuccess, loadItemsShowcaseSuccess } from '../../store/items-collection/items-collection.actions';
import { updateOrder } from '../../store/selected-order/selected-order.actions';
import { loadTableOrders } from '../../store/tables/table-one/table-one.actions';
import { loadUserLocationSuccess, loadUserSuccess } from '../../store/user/user.actions';
import { GENERAL_SPINNER, PATHS, REQUEST_SPINNER } from '../../utils/mncTypes-enums';
import { OperationIndex } from '../utils/operations.index';
import { Calendar } from '../../model/calendar';
import { loadCalendaruccess, loadCalendarSelectedSuccess } from '../../store/auxiliars/auxiliars.actions';
import { loadFormsValue } from '../../store/form/form.actions';
import { getCa } from 'src/app/store/auxiliars/auxiliars.selectors';
import { take, tap } from 'rxjs/operators';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  responseID: BehaviorSubject<any> = new BehaviorSubject(null)
  checkResponseIDObservable(){
    return this.responseID.asObservable()
  }

  constructor(
    private store: Store<ManagerState>,
    public snackBar: MatSnackBar,
    private router: Router ,
    private spinner: NgxSpinnerService
    ) {
  }

  public getNmcResult(result, redirect = '/'): OperationResult {
    const operationResult = new OperationResult();
    if (!result) {
          if (!operationResult.errors) operationResult.errors = [];
          operationResult.success = false;
          const errorMsg1: string = result.RESULT[0]['44'];
          const errorMsg2: string = result.RESULT[0]['39'];
          if(errorMsg1) operationResult.errors.push(errorMsg1);
          if(errorMsg2) operationResult.errors.push(errorMsg2);
      } else if (this.ok(result)) {
        operationResult.success = true
        operationResult.result  = !!result.RESULT[0] && Object.keys(result.RESULT[0]).length > 0 ? result.RESULT: []
      } else {
        operationResult.success = false
        operationResult.errors = [result['44']]
        this.snackBar.open(result['44'], '×', { panelClass: 'error', verticalPosition: 'bottom', duration: 3000 });
        operationResult.redirect = PATHS.NOT_FOUND
      }
      return operationResult

  }

  ok(res: any): boolean {
    return res['44'] === 'Transaction Approved';
}

  getResultsFromMultipleResponse(response) {
    let aux = {};
    response['RESULT'].forEach((e, i) => {
      aux[e['101'].length > 0 ? e['101'] : `error_${i}`] = e['101'] ?
      this.getNmcResult(e, e['101']).result:
      this.getNmcResult(e, e['101']);
    });
    return aux;
  }

  extractResponse(res){
    console.log(res)
    this.spinner.hide(REQUEST_SPINNER)
    this.spinner.hide(GENERAL_SPINNER)
    let aux = this.getResultsFromMultipleResponse(res['body'])
    Object.keys(this.getResultsFromMultipleResponse(res['body']))
    .forEach(e =>this.processResponses(e,aux[e]))

  }

  processResponses(key, value){

    if (key.includes('error')) {
      this.router.navigate([value.redirect])
      this.store.dispatch(ClearErrorsSuccess())
      this.store.dispatch(loadErrorsSuccess({data: value}))
      return
    }
    console.log(key, value)
  return ({
      [OperationIndex.GET_PARAMS] : (value) => this.store.dispatch(loadGlobalAuxiliars({data:value})),
      [OperationIndex.LOGIN] : (value) => this.loadUsername(value),
      [OperationIndex.GET_PROFILE] : (value) => this.loadUsername(value),
      [OperationIndex.GET_MERCHANT_ROLE_LOCATION] : (value) => this.loadUserLocation(value),
      [OperationIndex.get_Customer_notes] : (value) => this.store.dispatch(loadCustomersNotesSuccess({data: value ? (<Note []>this.dezerializaResults(Note, value)) : null})),
      [OperationIndex.search_Customer] : (value) => this.store.dispatch(loadTableThrees({tableThrees: value ? (<Customer []>this.dezerializaResults(Customer, value)) : null})),
      [OperationIndex.search_orders] : (value) => this.store.dispatch(loadTableOrders({tableOrders: value ? (<Order []>this.dezerializaResults(Order, value)) : null})),
      [OperationIndex.GET_CHAT_CONVERSATION] : (value) => this.store.dispatch(loadChatsSuccess({data: value ? (<NmcMessage []>this.dezerializaResults(NmcMessage, value)) : null})),
      [OperationIndex.GET_MESSAGES_USER] : (value) => this.store.dispatch(loadMessagesTables({messagesTables: value ? (<NmcMessage []>this.dezerializaResults(NmcMessage, value)) : null})),
      [OperationIndex.SEARCH_ORDERS_PHONE] : (value) => this.store.dispatch(loadTableFourths({tableFourths: value ? (<Order []>this.dezerializaResults(Order, value)) : null})),
      [OperationIndex.SEARCH_BAR_ORDERS] : (value) => this.store.dispatch(loadTableOrders({tableOrders: value ? (<Order []>this.dezerializaResults(Order, value)) : null})),
      [OperationIndex.Get_Seating_Areas_By_Location] : (value) => this.store.dispatch(loadSeatingAreaSuccess({data: value ? <SeatingArea []>this.dezerializaResults(SeatingArea, value) : null})),
      [OperationIndex.Get_Tables_By_Seating_Area] : (value) => this.store.dispatch(loadTableSeatingAreaSuccess({data: value ? <Table []>this.dezerializaResults(Table, value) : null})),
      [OperationIndex.Add_New_Order] : (value) => this.AddNewOrder(value),
      [OperationIndex.GET_ITEMS] : (value) => this.store.dispatch(loadItemsCollectionsSuccess({data: value ? <Category []>this.dezerializaResults(Category, value) : null})),
      [OperationIndex.Add_New_Seating_Area_By_Location] : (value) => this.openSnack('Seating added', 'success'),
      [OperationIndex.Remove_Seating_Area] : (value) => this.openSnack('Seating removed', 'success'),
      [OperationIndex.Add_Edit_Table_By_Seating_Area] : (value) => this.openSnack('operation was successful', 'success'),
      [OperationIndex.SAVE_MERCHANT_ROLE_LOCATION] : (value) => this.openSnack('operation was successful', 'success'),
      [OperationIndex.Remove_Table] : (value) => this.openSnack('Table removed', 'success'),
      [OperationIndex.Edit_Order_Details] : (value) => this.openSnack('Order Details Updated', 'success'),
      [OperationIndex.Place_Order] : (value) => this.openSnack('Order placed', 'success'),
      [OperationIndex.CancelOrder] : (value) => this.openSnack('Order Canceled', 'success'),
      [OperationIndex.Save_Delivery_By_Order] : (value) => this.openSnack('Delivery set', 'success'),
      [OperationIndex.Add_Note_By_Order] : (value) => this.openSnack('Note added', 'success'),
      [OperationIndex.Add_Edit_ItemsTo_Order] : (value) => this.addEditItem(value),
      [OperationIndex.GET_DELIVERY_METHODS] : (value) => this.store.dispatch(loadDeliveryMethodsSuccess({data: value ? <DeliveryMethods []>this.dezerializaResults(DeliveryMethods, value) : null})),
      [OperationIndex.Remove_Item_By_Order] : (value) => this.openSnack('Item removed', 'success'),
      [OperationIndex.OrderReady] : (value) => this.openSnack('The order is ready', 'success'),
      [OperationIndex.SEND_MESSAGE] : (value) => this.openSnack('Message send', 'success'),
      [OperationIndex.Pay_Order] : (value) => this.openSnack('Payment info saved', 'success'),
      [OperationIndex.SAVE_COMMENT] : (value) => this.openSnack('Comment saved', 'success'),
      [OperationIndex.Edit_Item_Status] : (value) => this.openSnack('Item status changed', 'success'),
      [OperationIndex.CHANGE_ORDER_STATUS] : (value) => this.openSnack('Order status changed', 'success'),
      [OperationIndex.Add_New_Customer] : (value) => this.openSnack('Customer information saved', 'success'),
      [OperationIndex.SHOWCASE_ITEMS] : (value) => this.store.dispatch(loadItemsShowcaseSuccess({data: value ? this.dezerializaResults(Item, value) : null})),
      [OperationIndex.AD_BANNER] : (value) => this.store.dispatch(loadAdBanner({data: value ? <Item []>this.dezerializaResults(Item, value) : null})),
      [OperationIndex.GET_RELATED_ITEMS] : (value) => this.store.dispatch(loadDialogDetailsAuxiliarSuccess({data: value ? <Item []>this.dezerializaResults(Item, value) : null})),
      [OperationIndex.Get_Reservation_By] : (value) =>  this.store.dispatch(loadCalendaruccess({data: value ? <Calendar []>this.dezerializaResults(Calendar, value) : null})),
      [OperationIndex.Get_Reservation_By_id] : (value) =>  this.reservation(value),
      [OperationIndex.Add_Edit_Reservation] : (value) => this.addEditReservation(value),
      [OperationIndex.GET_ASSIGNS] : (value) => this.store.dispatch(loadAssignsSuccess({data: value ? <Assigns []>this.dezerializaResults(Assigns, value) : null})),
      [OperationIndex.GET_PROMOTION] : (value) => this.store.dispatch(loadPromotionsSuccess({data: value ? <Promo []>this.dezerializaResults(Promo, value) : null})),
      [OperationIndex.DELETE_RESERVATION] : (value) => this.deleteAppo(value),
    })[key](value)
  }
  deleteAppo(value: any) {
    console.log(value)
  }
  addEditReservation(value){
    this.store.select(getCa)
    .pipe(
      take(1),
      tap((e:Array<Calendar>) => {
        if(!!value) {
          let id = UtilsService.notPadEleven(value[0]['116.200'])
          let newReservation = localStorage.getItem('temp')?  new Calendar().setAppoiment(JSON.parse(localStorage.getItem('temp'))):null
          newReservation = !!newReservation? new Calendar().setAppoiment({...newReservation, reservation_id: id }): null
          let data = [...e.filter(e => !!e['reservation_id'] && !e['reservation_id'].includes(id) ), newReservation].filter(e => !!e)
          console.log(newReservation, data)
          this.store.dispatch(loadCalendaruccess({data}))
          localStorage.removeItem('temp')
        }
      }),
     )
    .subscribe()
  }
  reservation(value: any) {
    let data = value ? <Calendar []>this.dezerializaResults(Calendar, value)[0] : null
    console.log(data, " --->>>>>>")
    return this.store.dispatch(loadCalendarSelectedSuccess({data}))
  }
  dezerializaResults(kind, value: []){
    return value.map(e => deserialize(e, kind))
  }

  openSnack(message, classes){
    return this.snackBar.open(message, '×', { panelClass: classes, verticalPosition: 'bottom', duration: 3000 })
  }

  AddNewOrder(value){
    this.openSnack('Order created', 'success')
    this.store.dispatch(updateOrder({data: deserialize<Order>(value[0], Order)}))
  }

  addEditItem(value){
    this.openSnack('item operation was successful', 'success')
    console.log(<Item []>this.dezerializaResults(Item, value)[0])
    this.responseID.next(<Item []>this.dezerializaResults(Item, value)[0])
  }

  loadUsername(value){
    if(!value || (!!value && !value[0])) return
    console.log('hello response',value[0])
    let user = value && value[0] ? deserialize<Business>(value[0], Business): null
    this.store.dispatch(loadUserSuccess({data: user}))
    if (!!user) this.store.dispatch(updateOrder({data: new Order().setOrder({employee_name: user.fullName})}))
  }

  loadUserLocation(value){
    this.store.dispatch(loadUserLocationSuccess({data: value}))
  }

}






