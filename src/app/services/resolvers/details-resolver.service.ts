// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { take} from 'rxjs/operators';
// import { ManagerState } from '../../store';
// import { OperationIndex } from '../utils/operations.index';
// import { RequestService } from '../api/request.service';
// // import { Lead } from '../../model/Lead';
// // import { getCountryId } from 'src/app/store/auxiliars/auxiliars.selectors';
// import { Country } from '../../model/country';
// import { cleanForm, loadFormsValue } from '../../store/form/form.actions';
// // import { loadListSelectedSuccess } from '../../store/lists/lists.actions';
// // import { loadActionSuccess, loadSubSectionSuccess } from '../../store/auxiliars/auxiliars.actions';
// import { PATHS } from 'src/app/utils/mncTypes-enums';
// // import { Note } from 'src/app/model/aionote';



// @Injectable({
//   providedIn: 'root'
// })
// export class DetailsResolverService implements Resolve<any>  {
//   aux
//   countryId
//   constructor(
//     private _requestService:RequestService,
//     private store: Store<ManagerState>
//     ) {
//     //   this.store.select(getCountryId)
//     // .pipe(take(1))
//     // .subscribe(e => this.countryId = e)
//     }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | Observable<any> {
//     let request: any = []
//     let subsection = state.url.split('/')[3]
//     this.store.dispatch(cleanForm())
//     switch (subsection) {
//       case PATHS.FORM:
//         request.push({
//           operation: OperationIndex.GET_STATES,
//           plain: new Country().setObject({countryId:this.countryId}),
//          })
//         break;
//       case PATHS.SCHEDULE:
//         request.push({
//           operation: OperationIndex.GET_STATES,
//           plain: new Country().setObject({countryId:this.countryId}),
//          })
//         break;
//       case PATHS.NOTES:
//         this.store.dispatch(loadActionSuccess({data: ''}))
//         request.push({
//           operation: OperationIndex.GET_NOTES,
//           plain: new Note().setObject({userId: route.paramMap.get('userId')}),
//          })
//         break;
//       case PATHS.ACTIVITY:
//         request.push({
//           operation: OperationIndex.GET_ACTIVITIES,
//           plain: null,
//           filter:this._requestService.filterActivity(route.paramMap.get('userId')),
//           order:"121.141-DESC",
//           expected:'ALL'
//           })
//         break;
//       default:
//         break;
//     }
//     this.store.dispatch(loadSubSectionSuccess({data: subsection}))
//     if(state.url.includes(`/${PATHS.FORM}/`)) this.store.dispatch(loadActionSuccess({data: state.url.split('/')[4]}))
//     if(route.paramMap.get('companyId')){
//       this.store.dispatch(loadListSelectedSuccess(
//         {data:{companyId: route.paramMap.get('companyId'),
//           userId: route.paramMap.get('userId')}}))
//       request.push(this.getLeadByIdOperation(route.paramMap.get('companyId'),route.paramMap.get('userId')))
//     } else this.store.dispatch(loadFormsValue({data: null}))
//     return this._requestService.buildRequest(request)
//   }

//   getLeadByIdOperation(companyId, userId){
//     return {
//       operation: OperationIndex.GET_LEAD_BY_ID,
//       plain: new Lead().setObject({companyId, userId}),
//       expected:'ALL'
//     }
//   }

// }
