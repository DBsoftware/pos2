import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
import { GetItems } from 'src/app/model/item';


@Injectable({
  providedIn: 'root'
})
export class WaiterIDBeforePageLoadService implements Resolve<any>  {

  constructor(
    private _requestService:RequestService,
    private _responseService:ResponseService,
    private store: Store<ManagerState>
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
    let path = state.url.split('/')[1]
    return this.store.select(getSelectedOrdernumber)
    .pipe(take(1),switchMap(e =>{
      return this.store.select(getUserState)
      .pipe(take(1),switchMap((i) => {
        let {location_id} = i.location_info[0]
        return this._requestService.buildRequest(this.counterOperations(location_id, route.paramMap.get('order_id'), route.paramMap.get('category_id'),i.merchant_id,i.id , !!e || !!route.paramMap.get('order_id')))
        .pipe(tap(e => {
          if(!!this._responseService.getResultsFromMultipleResponse(e)[OperationIndex.search_orders]){
            let aux = <Order []>this._responseService.dezerializaResults(Order, this._responseService.getResultsFromMultipleResponse(e)[OperationIndex.search_orders])
            this.store.dispatch(loadSelectedOrdersSuccess({data: aux[0]}))
            this.store.dispatch(loadFormValidation({data: true}))
          }
        }))
      }))
    }))
  }

  counterOperations(location_id, order_id, category_id,merchant_id,user_id,flag){
    return [
      flag ? {operation: OperationIndex.search_orders,plain: new Order().setOrder({id: order_id})}: null,
      {operation: OperationIndex.Get_Seating_Areas_By_Location,plain: new SeatingArea().setSeatingArea({location_id})},
      {operation: OperationIndex.GET_ITEMS,
        plain: new GetItems().setGetItemsCategory({category_id, merchant_id, id: user_id})}
    ].filter(e => !!e)
  }



}
// route.paramMap.get('id')
// {merchant_id: UtilsService.hexToHTMLstring(route.paramMap.get('id'))}
