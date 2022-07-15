import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { switchMap, take} from 'rxjs/operators';
import { Order } from '../../model/order';
import { SeatingArea } from '../../model/seating-area';
import { ManagerState } from '../../store';
import { getMerchantId, getUserState } from '../../store/user/user.selectors';
import { OperationIndex } from '../utils/operations.index';
import { RequestService } from '../api/request.service';
import { ORDERSTATUS, PATHS } from 'src/app/utils/mncTypes-enums';
import { Business } from 'src/app/model/business';
import { DeliveryMethods } from 'src/app/model/delivery-options';
import { Customer } from 'src/app/model/customer';
import { Item } from '../../model/item';

@Injectable({
  providedIn: 'root'
})
export class BeforePageLoadService implements Resolve<any>  {

  constructor(
    private _requestService:RequestService,
    private store: Store<ManagerState>
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
    let path = state.url.split('/')[1]
    console.log('path',state)
    return zip(this.store.select(getUserState), this.store.select(getMerchantId))
    .pipe(take(1),switchMap(([i,e]) => {
      let {location_id} = i.location_info[0]
      let aux = ({
        [PATHS.COUNTER]: this.counterOperations(e, location_id),
        [PATHS.RESERVATIONS]: this.counterOperations(e, location_id),
        [PATHS.KITCHEN]: this.counterOperations(e, location_id),
        [PATHS.ORDER_DETAIL]: this.counterOperations(e, location_id),
        [PATHS.WAITER]: this.waiterOperations(e, location_id, i.id),
        [PATHS.ORDERS]: this.counterOperations(e, location_id, i.id),
        [PATHS.MESSAGES]: this.messagesOperations(location_id, e,i.id),
        [PATHS.MESSAGES_WAITER]: this.messagesOperations(location_id, e,i.id),
        [PATHS.CHAT]: this.messagesOperations(location_id, e,i.id),
      })[path]
      return this._requestService.buildRequest(aux)
    }))
  }

  counterOperations(merchant_id, location_id, user_id = undefined){
    console.log('locacion', location_id)
    return [
      {operation: OperationIndex.search_orders,plain: new Order().setOrder({merchant_id, location_id, user_id, order_status_id: `${ORDERSTATUS.Open}`})},
      {operation: OperationIndex.search_Customer,plain: new Customer().searchCustomer({merchant_id})},
      {operation: OperationIndex.Get_Seating_Areas_By_Location,plain: new SeatingArea().setSeatingArea({location_id})},
      {operation: OperationIndex.GET_ASSIGNS,plain: new Customer().searchCustomer({merchant_id}), filter:this._requestService.filterAssigns(merchant_id),},
      // {operation: OperationIndex.GET_PROMOTION,plain: new Item().getPromo({merchantId: merchant_id, itemType: '23'})},
      {operation: OperationIndex.GET_PROMOTION,filter: this._requestService.filterPromotios(merchant_id)},
      {operation: OperationIndex.Get_Reservation_By,plain: new Business().setShowcase({id:merchant_id})},
      {operation: OperationIndex.GET_DELIVERY_METHODS,plain: new DeliveryMethods().setDeliveyMethods({merchant_id})},
      {operation: OperationIndex.SHOWCASE_ITEMS,plain: new Business().setShowcase({id:merchant_id})}
    ]
  }
  messagesOperations(location_id, merchant_id ,user_id = undefined){
    console.log('locacion', location_id)
    return [
      {
      operation: OperationIndex.GET_MESSAGES_USER,
      plain: new Business().setMessages({id: user_id, messages_flag: 'true'}),
      filter:this._requestService.filterLocation(location_id, user_id, merchant_id),
      expected:'ALL'
      },
    ]
  }
  waiterOperations(merchant_id, location_id, user_id = undefined){
    return [
      {operation: OperationIndex.search_orders,plain: new Order().setOrder({merchant_id, location_id, user_id, order_status_id: `${ORDERSTATUS.Open}`})},
      {operation: OperationIndex.Get_Seating_Areas_By_Location,plain: new SeatingArea().setSeatingArea({location_id})},
      {operation: OperationIndex.AD_BANNER,plain: new Business().setAD({id: user_id}), filter: this._requestService.filterAd(merchant_id), expected: '53,114.70,121.77' },
      {operation: OperationIndex.SHOWCASE_ITEMS,plain: new Business().setShowcase({id:merchant_id})}
    ]
  }




}
