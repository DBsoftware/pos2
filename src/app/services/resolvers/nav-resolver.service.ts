import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, zip} from 'rxjs';
import { ManagerState } from '../../store';
import { loadSectionSuccess } from '../../store/auxiliars/auxiliars.actions';
import { RequestService } from '../api/request.service';
import { OperationIndex } from '../utils/operations.index';
import { tokenKey } from '../../utils/mncTypes-enums';
import { User } from '../../model/user';
import { getUserId, isAdmin } from '../../store/user/user.selectors';
import { take, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class NavResolverService implements Resolve<any>  {
  aux
  hascompanyType =false
  hasstate =false
  hascity =false
  constructor(
    private _requestService:RequestService,
    protected store: Store<ManagerState>,
    ) {
    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
    this.store.dispatch(loadSectionSuccess({data: route.paramMap.get('sec').includes('accounts')?route.paramMap.get('sec'):'leads' }))
    let USER_ID = localStorage.getItem(tokenKey)
    return zip([this.store.select(getUserId),this.store.select(isAdmin)])
    .pipe(take(1),
    switchMap(([e, i]) => this._requestService.postNMCRequest(
      [this._requestService.setOperationParams(OperationIndex.GET_M_AND_L_QTY,
        new User().setObject({USER_ID: !i?e:'00000000000000000000'})
        ),]
      )))
  }




}
