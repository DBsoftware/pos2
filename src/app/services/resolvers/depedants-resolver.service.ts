// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { Observable, of} from 'rxjs';
// import { ManagerState } from '../../store';
// import { loadSubcats, loadCities, loadZips } from '../../store/auxiliars/auxiliars.actions';
// import { getFormValue } from 'src/app/store/form/form.selectors';
// import { filter, tap, take } from 'rxjs/operators';



// @Injectable({
//   providedIn: 'root'
// })
// export class DependantsResolverService implements Resolve<any>  {
//   aux
//   hascompanyType =false
//   hasstate =false
//   hascity =false
//   constructor(
//     protected store: Store<ManagerState>,
//     ) {
//     }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
//     return state.url.split('/').slice(2).length < 1?
//     of(true):this.store.select(getFormValue)
//     .pipe(
//       filter(e => !!e),
//       tap(this.resolveList.bind(this)),
//       take(1)
//       )
//   }

//   resolveList(value){
//     if(value.companyType ) {
//       this.store.dispatch(loadSubcats({data: value.companyType}))
//     }
//     if(value.state) {
//       this.store.dispatch(loadCities({data: value.state}))
//     }
//     if(value.city) {
//       this.store.dispatch(loadZips({data: value.city}))
//     }
//   }


// }
