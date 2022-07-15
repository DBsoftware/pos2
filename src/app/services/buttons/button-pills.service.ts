import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Order } from '../../model/order';
import { ManagerState } from '../../store';
import { loadCountersSuccess, loadSubtitleSuccess } from '../../store/counter-state/counter.actions';
import {
  loadDialogManualSuccess,
  loadDialogOneSuccess,
  loadDialogOptionsSuccess,
  openDialogManualSuccess,
  openDialogTwoSuccess,
  openDialogOneSuccess,
  openDialogOptionsSuccess,
  loadDialogDetailsSuccess,
  loadDialogReceiptSuccess,
  openDialogReceiptSuccess,
  openQrDialog} from '../../store/Dialogs/dialog.actions';
import { addTableOrder, deleteTableOrder } from '../../store/tables/table-one/table-one.actions';
import { addNewOrder, clearSelected, loadSelectedOrdersSuccess, updateOrder } from '../../store/selected-order/selected-order.actions';
import { preloadTableOrders, updateTableOrder } from '../../store/tables/table-one/table-one.actions';
import { loadItems, updateItem } from '../../store/tables/table-two/table-two.actions';
import { ITEM_STATUS, ORDERDETAILSTATUS, ORDERSTATUS, PATHORDERDEATILS, PATHS, Subtitle } from '../../utils/mncTypes-enums';
import { ButtonsActionsService } from './buttons-actions.service';
import { OperationIndex } from '../utils/operations.index';
import { RequestService } from '../api/request.service';
import {Item, POStructure} from '../../model/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { clearItems } from '../../store/tables/table-two/table-two.actions';
import { loadItemsCollectionsSuccess } from 'src/app/store/items-collection/items-collection.actions';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';
import { loadActiveRowsSuccess } from 'src/app/store/items/items.actions';
import { ResponseService } from '../api/response.service';
import { ItemsActions } from 'src/app/utils/actions/itemsActions';
import { OrdersActions } from 'src/app/utils/actions/ordersActions';
import { Customer, Note } from 'src/app/model/customer';
import { Subject } from 'rxjs';
import { addNote, cleanCustomers, loadCustomerFormValidation, loadCustomersSuccess } from 'src/app/store/customer/customer.actions';
import { loadTableFourths } from 'src/app/store/tables/table-fourth/table-fourth.actions';
import * as moment from 'moment';
import { NmcMessage } from 'src/app/model/nmc_message';
import { loadChatMessageSuccess } from 'src/app/store/chat/chat.actions';
import { Calendar } from '../../model/calendar';
import { USER_ID } from '../../model/nmc_fields';
import { loadFormsValue } from '../../store/form/form.actions';
import { addCalendaruccess, loadCalendarSelectedSuccess, loadCalendaruccess } from '../../store/auxiliars/auxiliars.actions';

@Injectable({
  providedIn: 'root'
})
export class ButtonPillsService extends ButtonsActionsService{
  closeSubject = new Subject()
  closeSubjectObservable(){
    return this.closeSubject.asObservable()
  }
  alt = false
  saveInfo = false
  breakLine = '!&;'
  constructor(
    protected store: Store<ManagerState>,
    protected router: Router,
    protected _responseService: ResponseService,
    protected _requestService: RequestService,
    public snackBar: MatSnackBar,
    public location: Location
    ) { super(store, router,_responseService, _requestService)}

    addOrderID(){
      return `/${this.orderSelected.id}`
    }

  fillVariables(){
    this.getOrderSelected()
    this.getfirstMessage()
    this.getPayload()
    this.getStoreFormValidation()
    this.getStoreUserState()
    this.getCustomer()
    this.getCustomerValidation()
    this.getFormValue()
    this.getFormValid()
    this.getCa()
  }
  pills(item, aditional = null){
    this.fillVariables()
    let key = `${!this.alt || !item.alt ? item.label: item.alt}${!!item.id?item.id:''}`
    console.log(key)
    switch (key) {
      case 'Add itemsnav':  return this.AddNavOperation();
      case 'add': return this.addOperation()
      case 'Add Items':return this.addItemsOperation()
      case 'AddIDW': return this.addWaiter()
      case 'Activate':return this.itemStatus(ITEM_STATUS.active);
      case 'Add Items':return this.menuOperation();
      case 'ADD NOTE':return this.addNoteOperation()
      case 'Begin order': return this.saveNavOperation();
      case 'Bar': return this.barOperation();
      case 'Reservations': return this.routeNavigate(`${PATHS.RESERVATIONS}/${moment().format('YYYY-MM-DD')}` );
      case 'Close Order': return this.statusChange(OperationIndex.Place_Order,ORDERSTATUS.Open)
      case 'Customer History':return this.CustomerHistory()
      case 'Customer Lookup':return this.CustomerHistory()
      case 'Cancel Order':return this.cancelOrder()
      case 'Clear':return this.clearCustomer()
      case 'Cancelnav':return this.cancelOrder()
      case 'Cancelcustomer':return this.cancelCustomer()
      case 'CancelIDW': return this.cancelWaiter()
      case 'Cancelpay': return this.cancelPay()
      case 'cancel':return this.statusChange(OperationIndex.CancelOrder,ORDERSTATUS.Cancel,null,1)
      case 'Current Orders':return this.filterOperations(ORDERSTATUS.Open)
      case 'Clear Order': return this.clearOrder();
      case 'Deliverednav':return this.deliveredAll()
      case 'Delete':return this.removeOperationCounter(aditional);
      case 'Disable':return this.itemStatus(ITEM_STATUS.inactive);
      case 'Mark as Deliveredqty':return this.deliveryUpdateStatus(aditional);
      case 'Edit order': return this.saveNavOperation();
      case 'Messages': return this.routeNavigate('messages');
      case 'Messagesnav': return this.routeNavigate('mwaiter');
      case 'Menu':return this.menuOperation();
      case 'New Customer':return this.newCustomer()
      case 'options':return this.optionsOperation(aditional)
      case 'Order Complete':return this.statusChange(OperationIndex.OrderReady,ORDERSTATUS.Done)
      case 'Order History':return this.filterOperations(ORDERSTATUS.Close);
      case 'Pay for Order':return this.payforOrder()
      case 'Print Order':return this.printOrder();
      case 'Print Labels':return this.printLabels();
      case 'Save':return this.saveNavOperation()
      case 'Savepay':return this.savePayOperation()
      case 'Set Delivery': return this.deliveryOperation()
      case 'Send': return this.sendMessage(aditional)
      case 'Submitcustomer': return this.saveNotes(aditional)
      case 'View Ordernav': return  this.orderView()
      case 'Updateqty': return this.updateItemOperation(aditional);
      case  'Pay with QR': return this.qrDialog();
      case 'XIDW': return this.openRemoveDialog(aditional)
      case 'XIDC': return this.openRemoveDialog(aditional)
      case 'Go Back': this.routeNavigate('')
      case 'New Appoiment': return this.newAppoiment(aditional)
      case 'Save Appoiment Information': return this.saveAppoimentInfo(aditional)
      case 'Cancelsch':return this.routeNavigate('')
      case 'Deletesch':return this.deleteSch(aditional)
      default:
        return 1;
      }
  }
  qrDialog() {
    console.log('bla')
    this.storeDipatch([openQrDialog({data:  true})])
    return 1
  }
  deleteSch(aditional) {
    console.log(aditional.reservationId)
    if(!aditional.reservationId) return this.openSnackBar('Please select an appoiment')
    this.store.dispatch(loadCalendaruccess(
      {data:
        this.calendarList.filter(e => !e['reservation_id'].includes(aditional.reservationId))
      }))
    this.routeNavigate(`${PATHS.RESERVATIONS}/${moment().format('YYYY-MM-DD')}` )
    this.newAppoiment(aditional)
    this.callRequestService(
      [
        {operation: OperationIndex.DELETE_RESERVATION, plain: new Calendar().setSearchById({reservation_id: aditional.reservationId})}
      ]
    )
  }
  saveAppoimentInfo(aditional) {
    if(!this.formValid) return this.openSnackBar('Please check required fields')
    let calendar = new Calendar().setAppoiment({...this.formValue,
      location_id:this.user_info.location_id,
      user_id: this.user_info.merchant_id,
      reservation_date: aditional.date,
      reservation_id: aditional.reservationId
    })
    // if(!aditional.reservationId){
    //   console.log('estresado')
      let aux = moment(aditional.date).format()
       localStorage.setItem('temp',JSON.stringify({...calendar,reservation_date: aux.slice(0,aux.lastIndexOf('T'))  }))
    // }
    this.store.dispatch(loadFormsValue({data:new Calendar()}));
    // this.store.dispatch(loadCalendarSelectedSuccess({data:new Calendar()}));
    return this.callRequestServiceNoSubcription({
      operation: OperationIndex.Add_Edit_Reservation,
      plain: new Calendar().setAppoiment({...calendar})}).subscribe(e => {
        // this.routeNavigate(`${PATHS.RESERVATIONS}/${moment().format('YYYY-MM-DD')}` )
        console.log('some', e)
      })

  }
  newAppoiment(aditional: any) {
    this.store.dispatch(loadFormsValue({data:new Calendar()}));
    this.store.dispatch(loadCalendarSelectedSuccess({data:new Calendar()}));
    this.routeNavigate(`${PATHS.RESERVATIONS}/${moment().format('YYYY-MM-DD')}` );
  }


  sendMessage(aditional) {
    let {location_id , id: user_id, merchant_id} = this.user_info
    let plain = new NmcMessage().sendMessages({
      ...this.message,
      content: aditional.content,
      subject: aditional.content,
      sender: user_id,
      messages_flag: 'false',
      location_id,
      type_id: '92'
    })
    return this.dispatchAfter({
      operation: OperationIndex.SEND_MESSAGE,
      plain,
      expected:'ALL'
    }, [loadChatMessageSuccess({data:
      {...plain,
        sender_name: this.user_info.fullName,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    })],1)
  }
  clearCustomer() {
    return this.storeDipatch([cleanCustomers()],null, 0)
  }
  cancelPay() {

    return this.storeDipatch([
      loadSelectedOrdersSuccess(
        {data: new Order().setOrder({...this.orderSelected,
          order_tip: undefined,
          order_approval: undefined,
          credit_card_type_id: undefined,
          order_last4: undefined})})], null, 1)
  }
  cancelCustomer() {
    // return this.storeDipatch([cleanCustomers()], null, 1)
    return 1
  }

  saveNotes(aditional){
    console.log(aditional.length)
    if(!aditional || aditional.length < 1) return this.openSnackBar('Please add a comment')
    return this.dispatchAfter({
      operation: OperationIndex.SAVE_COMMENT,
      plain: new Note().setCustomerNotes({
        user_id: this.user_info.id,
        customer_phone_number: this.customerInfo.customer_phone_number,
        customer_note: aditional })
    }, [addNote({data: new Note().setNote({
      customer_note: aditional,
      note_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      username: this.user_info.fullName,
    })})],0)
  }


  AddNavOperation(){
    if (!this.orderSelected.order_number)
      return this.openSnackBar('Must create or select an order to add items')
    return this.routeNavigate('/order-details/showcase'+this.addOrderID())
  }

  addOperation(waiter = false){
    if (!this.flag) return this.openSnackBar('Check the order information provided on the order form to the right to create a new order or adding items')
    if (!this.orderSelected.order_number) return this.addItemandOrderCreation(waiter)
    let payloadAux = new ItemsActions(this.payload,null, this.orderSelected, null).setItemToAdd()
    return this.dispatchAfterResposeId(
      {operation: OperationIndex.Add_Edit_ItemsTo_Order ,
        plain: new Item().setAddItems(payloadAux)},
      payloadAux,
      this.includeId,this.orderSelected , 1
        )
      }

  includeId(item: Item, order , response){
    console.log('respuesta',response, item)
    let aux = new ItemsActions(
      new Item().setItem( {...item,order_detail_id :response}),
      null, order, null)
      .addItemToCollectionOfOrder()
    return [
    loadItems({Items: aux}),
    loadSelectedOrdersSuccess({data: new Order().setOrder({...order, items: aux})}),
    updateTableOrder({tableOrder: {id: order.id, changes: new Order().setOrder({...order,items: aux})} }),
    ]
  }

  addItemandOrderCreation(waiter = false){
    console.log('add one',this.orderSelected)
    // let order = {...this.orderSelected, user_id: this.user_info.id, merchant_id: this.user_info.merchant_id}
    let order = new OrdersActions(this.orderSelected,this.user_info).setOrderToAdd()
    this.callRequestServiceNoSubcription({operation: OperationIndex.Add_New_Order ,plain: new Order().setOrder(order)})
    .pipe(
      switchMap(e => this.store.select(getSelectedOrdernumber)),
      filter(e => !!e),
      tap(e => this.getOrderSelected()),
      take(1)
    )
    .subscribe(e => {
      this.store.dispatch(addTableOrder({ tableOrder: this.orderSelected }))
      this.fillVariables()
      waiter? this.addWaiter():this.addOperation()
    })
    return 1
  }

  addWaiter(waiter = true){
    this.addOperation(waiter)
    if(!!this.orderSelected.order_number)
      this.routeNavigate('order-details/showcase/'+`${this.orderSelected.id}`)
    return 0
  }

  cleanCustomer(){
    console.log('clean')
    this.storeDipatch([cleanCustomers(), loadTableFourths({tableFourths: []})])
    return 0
  }

  barOperation(){

  return this.dispatchAfter(
    {operation: OperationIndex.SEARCH_BAR_ORDERS,
      plain: new Order().setOrder({
        searchword: this.orderSelected.searchword,
        merchant_id: this.user_info.merchant_id,
        order_status_id: `${ORDERSTATUS.Open}`,
        location_id: this.user_info.location_id})},
      [
        loadCountersSuccess({value: 'first'}),
        loadSubtitleSuccess({value: Subtitle.BAR}),
      ]
  )
  }

  printOrder(){
    if (!this.orderSelected.order_number) return this.openSnackBar('Must select an order')
    return this.storeDipatch(
      [
        loadDialogReceiptSuccess({data: true}),
        openDialogReceiptSuccess({data:  true})
      ]
      ) ;
  }
  printLabels(){
    if (!this.orderSelected.hasDoneItems) return this.openSnackBar('You can not print labels for this order!')
    return this.storeDipatch(
      [
        loadDialogReceiptSuccess({data: false}),
        openDialogReceiptSuccess({data:  true})
      ]
      ) ;
  }

  deliveredAll(){
    let aux = new OrdersActions(this.orderSelected, null).changeItemsStatus(ORDERDETAILSTATUS.Delivered)
    let auxServer = new OrdersActions(aux, null).setUpServer()
    return  this.dispatchUpdate(aux, auxServer)
  }

  orderView(){
    this.routeNavigate(`${PATHS.ORDER_DETAIL}/${PATHORDERDEATILS.VIEW}/${this.orderSelected.id}`)
  }

  menuOperation(){
    this.storeDipatch([loadCountersSuccess({value: 'second'})])
  }

  hasCustomerInfo(row: Order){
    console.log()
    return (!!row.customer_firstname && !!row.customer_lastname)
    && (!!row.customer_phone_number && row.customer_phone_number.length > 0)
  }

  CustomerHistory(customer_phone_number = null){
    if(!customer_phone_number){
      this.storeDipatch([
        openDialogTwoSuccess({data:  true}),
        loadCustomersSuccess({data: new Customer().setNewCustomer(this.orderSelected)}),
        loadCustomerFormValidation({data: this.hasCustomerInfo(this.orderSelected)})

      ])
    }
    this.searchByPhone(!customer_phone_number? this.orderSelected.customer_phone_number: customer_phone_number)
    return 0;
  }

  searchByPhone(customer_phone_number){
    if(!customer_phone_number || customer_phone_number.length < 1) return
    this.callRequestService(
      [
        {operation: OperationIndex.SEARCH_ORDERS_PHONE, plain: new Customer().setNewCustomer({customer_phone_number: customer_phone_number})},
        {operation: OperationIndex.get_Customer_notes, plain: new Customer().getCustomerNotes({customer_phone_number: customer_phone_number})}
      ]
      )
  }

  newCustomer(){
    if(!this.customerValid) {
      this.openSnackBar('Please check phone and customer name!')
      return 0
    }
    return this.callRequestService({operation: OperationIndex.Add_New_Customer, plain: new Customer().setNewCustomer({...this.customerInfo, merchant_id: this.user_info.merchant_id})})
  }

  clearOrder(){
    return  this.storeDipatch([clearSelected(),
      cleanCustomers(),
      clearItems(),
      updateOrder({data: new Order().setOrder({employee_name: this.user_info.fullName})}),
      loadCountersSuccess({value: 'first'})])
  }

  itemStatus(status){
    this.getItemsCollection()
    let aux = new Item().setItem({...this.payload, productStatus: status})
    let adjusted = this.itemsCollection.map(e => e.category_Name.includes(aux.category_name)?
    ({...e, PC: e.PC.map(it => it.id == aux.id? ({...it, productStatus: `${status}`}): it)}):e)
    let row = this.itemsCollection.filter(e => e.category_Name.includes(aux.category_name))[0]
    row = {...row, PC: row.PC.map(it => it.id == aux.id? ({...it, productStatus: `${status}`}): it)}
    console.log(row)
    console.log('Items status', aux, adjusted)
    this.dispatchAfter({operation: OperationIndex.Edit_Item_Status ,plain: new Item().setItemStatus({...this.payload, productStatus: `${status}` }) },
    [loadItemsCollectionsSuccess({data: adjusted}), loadDialogDetailsSuccess({data: aux}), loadActiveRowsSuccess({data: row})])
    return 0
  }




  saveNavOperation(){
    // if (!this.orderSelected.order_number) return this.newOrderOperation()
    return this.saveOperation()
  }

  newOrderOperation(){
    console.log('new')
    this.flag? this.storeDipatch([
      addNewOrder({data: {...this.orderSelected, merchant_id: this.user_info.merchant_id, user_id: this.user_info.id}})
    ])
  : this.openSnackBar('Choose a table on restaurant to add a new order')
  }



  optionsOperation(list){
    console.log(list)
    if(!list.options_list || list.options_list.length == 0) return this.openSnackBar('This item has not options','error',1)
    this.storeDipatch([loadDialogOptionsSuccess({data:  list}), openDialogOptionsSuccess({data:  true})])  ;
  }

  filterOperations(oper){
    return this.storeDipatch([
      loadCountersSuccess({value: 'first'}),
      loadSubtitleSuccess({value: oper == ORDERSTATUS.Open ?Subtitle.ACTIVE:Subtitle.CLOSED}),
      preloadTableOrders({data:  {order_status_id: `${oper}`, searchword : this.orderSelected.searchword, merchant_id: this.user_info.merchant_id, location_id: this.user_info.location_id}})
    ])  ;
  }

  statusChange(oper, status, idOne = null,state= 0, changeItems = true){
    let orderUpdate = new OrdersActions(this.orderSelected, null).changeOrderStatus(status, this.resolveItemStatus(oper), changeItems)
    this.dispatchAfter(
      {operation: oper ,plain: new Order().setOrder({id: this.orderSelected.id, order_status_id: `${status}`})},
      [
        updateTableOrder({tableOrder: {id: this.orderSelected.id, changes: new Order().setOrder({...orderUpdate}) }}),
        loadSelectedOrdersSuccess({data: new Order().setOrder({...orderUpdate})}),
        loadItems({Items: orderUpdate.items})
      ]
    )
    return state
  }

  resolveItemStatus(key){
    switch (key) {
      case OperationIndex.OrderReady:
        return ORDERDETAILSTATUS.Done;
      default:
        return ORDERDETAILSTATUS.Active;
    }
  }


  deliveryOperation(){
    if (!this.orderSelected.order_number) return this.openSnackBar('Must select an order to edit')
    return this.dispatchAfter(
      {operation: OperationIndex.Save_Delivery_By_Order,
        plain: new Order().setSetDelivery({...this.orderSelected})
      },
      [
        updateTableOrder({tableOrder: {id: this.orderSelected.id, changes: new Order().setOrder({...this.orderSelected}) }}),
        loadCountersSuccess({value: 'first'})
      ].filter(e => !!e),
      )
  }

  saveOperation(){
    if (!this.orderSelected.order_number) return this.openSnackBar('Must select an order to edit')
    console.log('save operation')
    let orderUpdateServer = new Order().setOrder({...this.orderSelected, PO: this.orderSelected.items.map(e => new POStructure().setPO({...e})), items: undefined})
    let orderUpdateLocal = new Order().setOrder({...this.orderSelected, items: this.orderSelected.items})
    console.log('actializar',this.orderSelected,'|', orderUpdateLocal,'|' ,orderUpdateServer)
    return this.dispatchUpdate(orderUpdateLocal, orderUpdateServer)
  }

  dispatchUpdate(orderUpdateLocal,orderUpdateServer = null){
    return this.dispatchAfter(
      {operation: OperationIndex.Edit_Order_Details ,plain: (!!orderUpdateServer? orderUpdateServer: orderUpdateLocal) },
      [
        updateTableOrder({tableOrder: {id: this.orderSelected.id, changes: orderUpdateLocal }}),
        loadCountersSuccess({value: 'first'}),
        loadSelectedOrdersSuccess({data: orderUpdateLocal})
      ].filter(e => !!e),
      )
  }

  placeOrder(){
    return this.storeDipatch(
      [loadCountersSuccess({value: 'first'})],
      {operation: OperationIndex.Place_Order ,plain: new Order().setOrder({id: this.orderSelected.id})}
      )
  }

  addItemsOperation(){
    if (!!this.orderSelected.order_number){
      return this.storeDipatch([loadCountersSuccess({value: 'second'})])
    }
    return this.openSnackBar('Must select an order')
  }


  cancelWaiter(){
    return this.routeNavigate('order-details/showcase/'+`${this.orderSelected.id}`)
  }

  updateItemOperation(payload: Item){
    console.log(payload)
    payload = payload ? payload:  this.payload
    // let flagStatus = this.orderSelected.order_status_id
    let aux = new ItemsActions(payload, null,this.orderSelected,null).updateItemOfOrder()
    let orderUpdate = new OrdersActions(this.orderSelected, null).updateItems(aux)

    if(orderUpdate.isAllDone && !this.orderSelected.isReady)
      orderUpdate.order_status_id = `${ORDERSTATUS.Done}`
    if(!orderUpdate.isAllDone && this.orderSelected.isReady)
      orderUpdate.order_status_id = `${ORDERSTATUS.Open}`
    console.log(orderUpdate.order_status_id, this.orderSelected.order_status_id)
    console.log(orderUpdate, this.orderSelected)
    return this.dispatchAfter(
      [
        {operation: OperationIndex.Add_Edit_ItemsTo_Order ,plain: new Item().setAddItems(payload)},
        ( !this.orderSelected.order_status_id.includes(orderUpdate.order_status_id)?
          {operation: OperationIndex.CHANGE_ORDER_STATUS ,plain: new Order().setOrder({id: orderUpdate.id, order_status_id: orderUpdate.order_status_id})} : null)
      ].filter(e => !!e),
      [
        loadItems({Items: aux}),
        loadSelectedOrdersSuccess({data: orderUpdate}),
        updateTableOrder({tableOrder: {id: this.orderSelected.id, changes: orderUpdate} })],
        1
      )
  }

  deliveryUpdateStatus(payload: Item){
    payload = payload ? payload:  this.payload
    // let flagStatus = this.orderSelected.order_status_id
    let aux = new ItemsActions(payload, null,this.orderSelected,null).updateItemOfOrder()
    let orderUpdate = new OrdersActions(this.orderSelected, null).updateItems(aux)
    return this.dispatchAfter(
      [
        {operation: OperationIndex.Add_Edit_ItemsTo_Order ,plain: new Item().setAddItems(payload)},
      ].filter(e => !!e),
      [
        loadItems({Items: aux}),
        loadSelectedOrdersSuccess({data: orderUpdate}),
        updateTableOrder({tableOrder: {id: this.orderSelected.id, changes: orderUpdate} })],
        1
      )
  }
  updateItemListOperation(payload){
    let payloadAux = {...payload}
    let aux = this.orderSelected.items.map(e => e.order_detail_id == payload.order_detail_id ? new Item().setItem(payloadAux): e)
    return this.storeDipatch(
      [
        loadItems({Items: aux}),
        loadSelectedOrdersSuccess({data: new Order().setOrder({...this.orderSelected, items: aux})}),
        updateTableOrder({tableOrder: {id: this.orderSelected.id, changes: new Order().setOrder({...this.orderSelected,items: aux})} })
      ],
      )
  }

  removeOperationWaiter(order_detail_id){
    this.removeOperationCounter(order_detail_id)
    return 0
      // return this.routeNavigate('order-details/order-view'+`/${this.orderSelected.id}`)
  }

  savePayOperation(){
    let orderUpdate = new Order().setOrder({...this.orderSelected, order_status_id: ORDERSTATUS.Close})
    return this.dispatchAfter(
      [
        {operation: OperationIndex.Pay_Order,
        plain:
        new Order().setPay({...this.orderSelected, order_total: this.orderSelected.orderTotal})},
      ],
      [
        loadCountersSuccess({value: 'first'}),
        loadSubtitleSuccess({value: Subtitle.CLOSED}),
        preloadTableOrders({data:  {order_status_id: `${ORDERSTATUS.Close}`}}),
        loadSelectedOrdersSuccess({data: orderUpdate}),
        deleteTableOrder({id: this.orderSelected.id})]
      ,1)
  }
  addNoteOperation(){
    if (!this.orderSelected.order_number) return this.openSnackBar('Must select an order to edit')
    return this.dispatchAfter(
      {operation: OperationIndex.Add_Note_By_Order,
      plain:
      new Order().setAddNote({id: this.orderSelected.id, order_note: this.orderSelected.order_note.replace(/(?:\r\n|\r|\n)/g,this.breakLine )})},
      [updateTableOrder({tableOrder:
        {id: this.orderSelected.id,
          changes: new Order().updateNote({id: this.orderSelected.id,order_note: this.orderSelected.order_note}) }})]
      )
  }

  cancelOrder(){
    if (!this.orderSelected.order_number) return this.openSnackBar('Must select an order to cancel it')
    return this.storeDipatch([
      loadDialogOneSuccess({data:{title: 'Cancel New Order',subtitle: 'Are you sure you want to cancel this new order'}}),
        openDialogOneSuccess({data:  true})
      ]);
  }

  payforOrder(){
    if (!this.orderSelected.order_number) return this.openSnackBar('Must select an order to edit')
    return this.storeDipatch(
      [
        loadDialogManualSuccess({data: {}}),
        openDialogManualSuccess({data:  true})
      ]
      ) ;
  }

  openRemoveDialog(order_detail_id){
    let flag = !!this.user_info.can_delete && this.user_info.can_delete.includes('false')
    if(flag) return this.openSnackBar('You don\'t have enough permissions')
    return this.storeDipatch([
      loadDialogOneSuccess({data:{title: 'Confirm Removing Item',subtitle: 'Are you sure you want to remove this item from order', remove_id: order_detail_id}}),
        openDialogOneSuccess({data:  true})
      ]);
  }

  removeOperationCounter(order_detail_id){
    console.log('remove')
    let aux = this.orderSelected.items.filter(e => e.order_detail_id != order_detail_id)
    return this.dispatchAfter(
      {operation: OperationIndex.Remove_Item_By_Order ,plain: new Item().setRemoveItem({ order_detail_id: order_detail_id })},
      [
        loadItems({Items: aux}),
        loadSelectedOrdersSuccess({data: new Order().setOrder({...this.orderSelected, items: aux})}),
        updateTableOrder({tableOrder: {id: this.orderSelected.id, changes: new Order().setOrder({...this.orderSelected,items: aux})} })
      ],1
      )
    }







}
