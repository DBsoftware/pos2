import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, zip} from 'rxjs';
import { ManagerState } from '../../store';
import { RequestService } from '../api/request.service';
import { OperationIndex } from '../utils/operations.index';
import { tokenKey } from '../../utils/mncTypes-enums';
import { switchMap, take } from 'rxjs/operators';
import { getUserId } from '../../store/user/user.selectors';
import { User } from '../../model/user';



@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<any>  {

  constructor(
    private _requestService:RequestService,
    protected store: Store<ManagerState>,
    ) {
    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
    return this.store.select(getUserId)
    .pipe(take(1),
    switchMap(e => {
          console.log('home resolver')
          return this._requestService.postNMCRequest(this.getNumbers(e))}))

  }

  getNumbers(USER_ID){
    return !USER_ID.includes('4A0')? [
    this._requestService.setOperationParams(OperationIndex.Get_Pending_Merchant_Qty, null,null,null, this._requestService.filterActivity(USER_ID)),
    this._requestService.setOperationParams(OperationIndex.Get_Active_Merchant_Qty, null,null,null, this._requestService.filterActivity(USER_ID)),
    this._requestService.setOperationParams(OperationIndex.GET_INACTIVE_MERCHANTS_QTY, null,null,null, this._requestService.filterActivity(USER_ID)),
    this._requestService.setOperationParams(OperationIndex.Get_Active_Lead_Qty, null,null,null, this._requestService.filterActivity(USER_ID)),
    this._requestService.setOperationParams(OperationIndex.Get_Inactive_Lead_Qty, null,null,null, this._requestService.filterActivity(USER_ID)),
    this._requestService.setOperationParams(OperationIndex.Get_Monthly_Calls_Qty, null,null,null, this._requestService.filterActivity(USER_ID)),
    this._requestService.setOperationParams(OperationIndex.Get_Monthly_Target, null,null,null, this._requestService.filterActivity(USER_ID)),
    this._requestService.setOperationParams(OperationIndex.Get_Closing_Monthly_Target_Rate,new User().setObject({USER_ID})),
  ]: [
    this._requestService.setOperationParams(OperationIndex.Get_Pending_Merchant_Qty, null),
    this._requestService.setOperationParams(OperationIndex.Get_Active_Merchant_Qty, null),
    this._requestService.setOperationParams(OperationIndex.GET_INACTIVE_MERCHANTS_QTY, null),
    this._requestService.setOperationParams(OperationIndex.Get_Active_Lead_Qty, null),
    this._requestService.setOperationParams(OperationIndex.Get_Inactive_Lead_Qty, null),
    this._requestService.setOperationParams(OperationIndex.Get_Monthly_Calls_Qty, null),
    this._requestService.setOperationParams(OperationIndex.Get_Monthly_Target, null),
    this._requestService.setOperationParams(OperationIndex.Get_Closing_Monthly_Target_Rate, new User().setObject({USER_ID: '00000000000000000000'})),
  ]
  }




}
