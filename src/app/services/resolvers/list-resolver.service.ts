import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, zip} from 'rxjs';
import { switchMap, take} from 'rxjs/operators';
import { ManagerState } from '../../store';
import { getUserId, isAdmin } from '../../store/user/user.selectors';
import { OperationIndex } from '../utils/operations.index';
import { RequestService } from '../api/request.service';
import { searchleads, searchleadsLimits } from '../../model/Lead';
import { loadFormsValue, loadFormsStatus, cleanForm } from '../../store/form/form.actions';
import { DinamicUrlService } from './DinamicUrl.service';
import { ENTITY } from '../../utils/mncTypes-enums';



@Injectable({
  providedIn: 'root'
})
export class ListsPageResolverService implements Resolve<any>  {
  aux
  constructor(
    private _requestService:RequestService,
    private _dinamic:DinamicUrlService,
    private store: Store<ManagerState>
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
    this.store.dispatch(cleanForm())
    let sec = route.paramMap.get('sec')
    return zip([this.store.select(getUserId),this.store.select(isAdmin)])
    .pipe(take(1),
    switchMap(([e, i]) =>
       this._requestService.buildRequest(
         [this.searchLeadOperation(!i?e:undefined, this._dinamic.buildAux(state.url.split('/').slice(3)), sec)]
         )),
    )
  }



  searchLeadOperation(userId, searchParams, sec){
    let aux = new searchleads().setObject({userId, ...searchParams})
    aux.categoryType = !aux.categoryType && !!searchParams.companyType? searchParams.companyType: aux.categoryType
    this.store.dispatch(loadFormsValue({data: {...(new searchleads().toJson('userId')), ...searchParams}}))
    this.store.dispatch(loadFormsStatus({data: true}))
    let user_status = sec.includes('acc')? '37': undefined
    return {
      operation: OperationIndex.SEARCH_LEADS,
      plain: new searchleads().setObject({userId, user_status,...searchParams, entity: ENTITY[sec]}),
      count: true,
      limit: new searchleadsLimits().setObject({userId, ...searchParams})
   }
  }
}
