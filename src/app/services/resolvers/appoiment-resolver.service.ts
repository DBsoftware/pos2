// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { Observable, zip} from 'rxjs';
// import { ManagerState } from '../../store';
// import { loadSectionSuccess } from '../../store/auxiliars/auxiliars.actions';
// import { RequestService } from '../api/request.service';
// import { OperationIndex } from '../utils/operations.index';
// import { tokenKey } from '../../utils/mncTypes-enums';
// import { User } from '../../model/user';
// import { getUserId, isAdmin } from '../../store/user/user.selectors';
// import { take, switchMap } from 'rxjs/operators';
// import { Calendar } from '../../model/calendar';



// @Injectable({
//   providedIn: 'root'
// })
// export class AppoimentResolverService implements Resolve<any>  {
//   aux
//   hascompanyType =false
//   hasstate =false
//   hascity =false
//   constructor(
//     private _requestService:RequestService,
//     protected store: Store<ManagerState>,
//     ) {
//     }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
//     return this.store.select(getUserId)
//     .pipe(take(1),
//     switchMap((e) => this._requestService.postNMCRequest(
//       [this._requestService.setOperationParams(OperationIndex.Get_Calendar_Events_By_Id,
//         new Calendar().setObject({calendar_id: route.paramMap.get('id')}),null,null,null,'All')]
//       )))
//   }




// }
