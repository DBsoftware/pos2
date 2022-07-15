import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ManagerState } from '../../store';
import { loadCountersSuccess } from '../../store/counter-state/counter.actions';
import { addNewOrder, clearSelected, loadFormValidation, loadSelectedOrdersSuccess, updateOrder } from '../../store/selected-order/selected-order.actions';
import { ButtonsActionsService } from './buttons-actions.service';
import { RequestService } from '../api/request.service';
import { clearItems, loadItems } from 'src/app/store/tables/table-two/table-two.actions';
import { OperationIndex } from '../utils/operations.index';
import { Order } from 'src/app/model/order';
import { PATHORDERDEATILS, PATHS } from 'src/app/utils/mncTypes-enums';
import { ResponseService } from '../api/response.service';
import { cleanCustomers } from 'src/app/store/customer/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class ButtonFatService extends ButtonsActionsService {

  constructor(
    protected store: Store<ManagerState>,
    protected router: Router,
    protected _requestService: RequestService,
    protected _responseService: ResponseService,
    public snackBar: MatSnackBar
    ) { super(store, router, _responseService,_requestService, snackBar) }

    loadVariables(){
      this.getStoreUserState()
      this.getOrderSelected()
      this.getStoreFormValidation()

    }

  fats(item, payload = null){
    this.loadVariables()
    switch (item.label+(!!item.id? item.id: '')) {
      case 'New order':
        this.clearOrder()
        break;
      case 'New Order':
          this.routeNavigate(`${PATHS.ORDER_DETAIL}/${PATHORDERDEATILS.NEW_ORDER}`)
          this.storeDipatch([
            clearSelected(),
            loadFormValidation({data: false}),
            updateOrder({data: new Order().setOrder({employee_name: this.user_info.fullName})}),
            clearSelected()])
        break;
      case 'Menu':
          this.routeNavigate(`${PATHS.ORDER_DETAIL}/${PATHORDERDEATILS.SHOWCASE}${!!this.orderSelected && this.orderSelected.id ? ('/' + this.orderSelected.id) : ''}`)
          if(!this.orderSelected || !this.orderSelected.id) this.storeDipatch([loadFormValidation({data: false})])
        break;
      case 'Search':
          this.searchOperation(payload)
        break;
      case 'Home':
        this.routeNavigate('/hwaiter')
        break;
      case 'Orders':
        this.routeNavigate('/orders')
        break;
      case 'Messages':
        this.routeNavigate('/mwaiter')
        break;
      case 'View':
        console.log('loaa', this.payload)
        this.storeDipatch([
          loadItems({Items: payload.items?payload.items : []}),
          loadSelectedOrdersSuccess({data: payload}),
          loadFormValidation({data: true})
        ])
        this.routeNavigate(`${PATHS.ORDER_DETAIL}/${PATHORDERDEATILS.VIEW}/${payload.id}`)
        break;

      default:
        break;
    }
  }

    searchOperation(text){
      this.callRequestService({operation: OperationIndex.search_orders,
        plain: new Order().setOrder({searchword : text, merchant_id: this.user_info.merchant_id, location_id: this.user_info.location_id})},
      this.routeNavigate('/orders')
    )
    }

    clearOrder(){
      return  this.storeDipatch([
        clearSelected(),
        clearItems(),
        cleanCustomers(),
        loadCountersSuccess({value: 'second'}),
        updateOrder({data: new Order().setOrder({employee_name: this.user_info.fullName})}),
      ])
    }
}
