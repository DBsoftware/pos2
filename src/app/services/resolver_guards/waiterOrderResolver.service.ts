import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, zip } from 'rxjs';
import { switchMap, take, tap} from 'rxjs/operators';
import { Order } from '../../model/order';
import { SeatingArea } from '../../model/seating-area';
import { ManagerState } from '../../store';
import { getUserState } from '../../store/user/user.selectors';
import { OperationIndex } from '../utils/operations.index';
import { RequestService } from '../api/request.service';
import { getSelectedOrdernumber } from 'src/app/store/selected-order/selected-order.selectors';
import { ResponseService } from '../api/response.service';
import { loadFormValidation, loadSelectedOrdersSuccess } from 'src/app/store/selected-order/selected-order.actions';
import { clearItemsCollection, loadItemsCollections } from 'src/app/store/items-collection/items-collection.actions';
import { Business } from 'src/app/model/business';
import { loadItems } from 'src/app/store/tables/table-two/table-two.actions';
import { PATHORDERDEATILS } from 'src/app/utils/mncTypes-enums';
import { GetItems } from '../../model/item';


@Injectable({
  providedIn: 'root'
})
export class WaiterBeforePageLoadService implements Resolve<any>  {

  constructor(
    private _requestService:RequestService,
    private _responseService:ResponseService,
    private store: Store<ManagerState>
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
    let isShow = (state.url.split('/')[2] && (state.url.split('/')[2].includes(PATHORDERDEATILS.SHOWCASE) || state.url.split('/')[2].includes(PATHORDERDEATILS.NEW_ORDER)))
    console.log('isShow', isShow)
    this.store.dispatch(clearItemsCollection())
    // return this.store.select(getSelectedOrdernumber)
    // .pipe(take(1),switchMap(e =>{
      return this.store.select(getUserState)
      .pipe(take(1),switchMap((i) => {
        let {location_id} = i.location_info[0]
        // if(isShow) this.store.dispatch(loadItemsCollections({data: i}))
        // if (!!e) return of(true);
        let order_id = route.paramMap.get('order_id')
        if (isShow)
          return this._requestService.buildRequest(this.showOperations(location_id, i,order_id))
        return this._requestService.buildRequest(this.counterOperations(location_id,order_id , i.merchant_id))
        .pipe(tap(e => {
          let aux = <Order []>this._responseService.dezerializaResults(Order, this._responseService.getResultsFromMultipleResponse(e)[OperationIndex.search_orders])
          this.store.dispatch(loadSelectedOrdersSuccess({data: aux[0]}))
          this.store.dispatch(loadItems({Items: aux[0].items}))
          this.store.dispatch(loadFormValidation({data: true}))
        }))
      }))
    // }))
  }

  counterOperations(location_id, order_id, merchant_id){
    return [
      {operation: OperationIndex.search_orders,plain: new Order().setOrder({id: order_id})},
      {operation: OperationIndex.Get_Seating_Areas_By_Location,plain: new SeatingArea().setSeatingArea({location_id})},
      {operation: OperationIndex.SHOWCASE_ITEMS,plain: new Business().setShowcase({id:merchant_id})}
    ]
  }

  showOperations(location_id,data, order_id = null){
    return [
      !!order_id?
      {operation: OperationIndex.search_orders,plain: new Order().setOrder({id: order_id})}: order_id,
      {operation: OperationIndex.Get_Seating_Areas_By_Location,plain: new SeatingArea().setSeatingArea({location_id})},
      {operation: OperationIndex.SHOWCASE_ITEMS,plain: new Business().setShowcase({id:data.merchant_id})},
        {operation:
          OperationIndex.GET_ITEMS ,
          plain: new GetItems().setGetItem(data)}
    ].filter(e => !!e)
  }



}
// route.paramMap.get('id')
// {merchant_id: UtilsService.hexToHTMLstring(route.paramMap.get('id'))}
