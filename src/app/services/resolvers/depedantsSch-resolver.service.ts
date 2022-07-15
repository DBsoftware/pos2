import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of} from 'rxjs';
import { ManagerState } from '../../store';
import { filter, tap, take } from 'rxjs/operators';
// import { loadSubcats, loadCities, loadZips } from '../../store/auxiliars/auxiliars.actions';
// import { getFormValue } from 'src/app/store/form/form.selectors';
// import { getSelectedLead } from 'src/app/store/lists/lists.selectors';
// import { loadEditIdSuccess } from '../../store/calendar/calendar.actions';



@Injectable({
  providedIn: 'root'
})
export class DependantsSchResolverService implements Resolve<any>  {
  aux
  hascompanyType =false
  hasstate =false
  hascity =false
  constructor(
    protected store: Store<ManagerState>,
    ) {
    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
    // this.store.dispatch(loadEditIdSuccess({data: null}))
    // return this.store.select(getSelectedLead)
    // .pipe(
    //   filter(e => !!e),
    //   tap(this.resolveList.bind(this)),
    //   take(1)
    //   )
    return of(true)
  }

  resolveList(value){
    if(value.companyType ) {
      // this.store.dispatch(loadSubcats({data: value.companyType}))
    }
    if(value.state) {
      // this.store.dispatch(loadCities({data: value.state}))
    }
    if(value.city) {
      // this.store.dispatch(loadZips({data: value.city}))
    }
  }


}
