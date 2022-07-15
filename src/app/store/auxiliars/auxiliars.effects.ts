import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { loadGlobalAuxiliars, 
  loadGlobalAuxiliarsSuccess, 
  loadGlobalAuxiliarsFailure, 
  loadCategoriesAuxiliars, 
  loadCategoriesAuxiliarsSuccess, 
  loadCategoriesAuxiliarsFailure, 
  loadMerchantCategories,
  loadMerchantCategoriesFail, 
  loadMerchantCategoriesSuccess, 
  preLoadTableSeatingAreaSuccess} from './auxiliars.actions';
import { AioGlobals } from '../../services/store/aio.globals.service';
import { of } from 'rxjs';
import { GlobalParam } from '../../model/global-param';
import { RequestService } from 'src/app/services/api/request.service';
import { OperationIndex } from 'src/app/services/utils/operations.index';
import { SeatingArea } from 'src/app/model/seating-area';



@Injectable()
export class AuxiliarsEffects {

  


  constructor(
    private actions$: Actions,
    private _requestService: RequestService,
    public global: AioGlobals) {}

  $loadGlobals = createEffect(() =>
  this.actions$.pipe(
    ofType(loadGlobalAuxiliars),
    switchMap(({data}: any) => 
      of(this.global.setGlobalParam(data))
    .pipe(map((data: GlobalParam) => loadGlobalAuxiliarsSuccess({ data })),
        catchError((message) => of(loadGlobalAuxiliarsFailure({ data: message })))
      )
    )
  )
);
  $loadCategories = createEffect(() =>
  this.actions$.pipe(
    ofType(loadCategoriesAuxiliars),
    switchMap(({data}: any) => 
      of(this.global.parseCategories(data))
    .pipe(map((data: any) => loadCategoriesAuxiliarsSuccess({ data })),
        catchError((message) => of(loadCategoriesAuxiliarsFailure({ data: message })))
      )
    )
  )
);
  $loadMerchantCategories = createEffect(() =>
  this.actions$.pipe(
    ofType(loadMerchantCategories),
    switchMap(({data}: any) => 
      of(this.global.parseMerchantCategories(data))
    .pipe(map((data: any) => loadMerchantCategoriesSuccess({ data })),
        catchError((message) => of(loadMerchantCategoriesFail({ data: message })))
      )
    )
  )
);

callFilter$ = createEffect(() => this.actions$.pipe(
  ofType(preLoadTableSeatingAreaSuccess),
  switchMap(({data}: any) => 
    this._requestService.buildRequest([{operation: 
      OperationIndex.Get_Tables_By_Seating_Area ,
      plain: new SeatingArea().setSeatingArea({ seating_area_id: data})}])
  )
  ), { dispatch: false }
  );

}
