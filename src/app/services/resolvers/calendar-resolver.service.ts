import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { ManagerState } from '../../store';
import { RequestService } from '../api/request.service';
import { OperationIndex } from '../utils/operations.index';
import { loadFormsValue, loadFormsStatus } from '../../store/form/form.actions';
import { Calendar } from 'src/app/model/calendar';



@Injectable({
  providedIn: 'root'
})
export class CalendarResolverService implements Resolve<any>  {
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

    this.store.dispatch(loadFormsValue({data: null}))
    this.store.dispatch(loadFormsStatus({data: false}))
    return this._requestService.postNMCRequest(
      [this._requestService.setOperationParams(OperationIndex.Get_Reservation_By_id,
        new Calendar().setSearchById({reservation_id: route.paramMap.get('id')})
        )]
      )
      }




}
