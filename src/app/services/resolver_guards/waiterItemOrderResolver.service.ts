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
import { GetItems, Item } from 'src/app/model/item';
import { getDetails } from 'src/app/store/Dialogs/dialog.selectors';
import { Category } from 'src/app/model/category';
import { ItemsStoreService } from 'src/app/store/items/items.service';


@Injectable({
  providedIn: 'root'
})
export class WaiterItemBeforePageLoadService implements Resolve<any>  {

  constructor(
    private _requestService:RequestService,
    private _responseService:ResponseService,
    private store: Store<ManagerState>,
    private _itemsService: ItemsStoreService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
    return this.store.select(getDetails)
    .pipe(take(1),switchMap(e =>{
      if(!!e && (e.id == route.paramMap.get('item_id'))) return of(true)
      return this.store.select(getUserState)
      .pipe(take(1),switchMap((i) => {
        let {location_id} = i.location_info[0]
        return this._requestService.buildRequest(this.counterOperations(location_id, route.paramMap.get('order_id'), route.paramMap.get('category_id'),i.merchant_id,i.id , e && !!route.paramMap.get('order_id')))
        .pipe(tap(e => {
          let auxResponse = this._responseService.getResultsFromMultipleResponse(e)
          if(!!auxResponse[OperationIndex.search_orders]){
            let aux1 = <Order []>this._responseService.dezerializaResults(Order, auxResponse[OperationIndex.search_orders])
            this.store.dispatch(loadSelectedOrdersSuccess({data: aux1[0]}))
            this.store.dispatch(loadFormValidation({data: true}))
          }
          if(!!auxResponse[OperationIndex.GET_ITEMS]){
            let aux2 = <Category []>this._responseService.dezerializaResults(Category, auxResponse[OperationIndex.GET_ITEMS])
            console.log('categori id',aux2)
            this._itemsService.activeItem(route.paramMap.get('total'), aux2[0], route.paramMap.get('position'),
            new Item().setItem({...aux2[0].PC.filter(e => e.id == route.paramMap.get('item_id'))[0], location_id: i.location_id, merchantId: i.merchant_id }))
          }
        }))
      }))
    }))
  }

  counterOperations(location_id, order_id, category_id,merchant_id,user_id,flag){
    console.log(category_id, merchant_id, user_id)
    return [
      !!flag ? {operation: OperationIndex.search_orders,plain: new Order().setOrder({id: order_id})}: null,
      {operation: OperationIndex.Get_Seating_Areas_By_Location,plain: new SeatingArea().setSeatingArea({location_id})},
      {operation: OperationIndex.GET_ITEMS,
        plain: new GetItems().setGetItemsCategory({category_id, merchant_id, id: user_id})}
    ].filter(e => !!e)
  }



}
// route.paramMap.get('id')
// {merchant_id: UtilsService.hexToHTMLstring(route.paramMap.get('id'))}
