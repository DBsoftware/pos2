import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { RequestService } from 'src/app/services/api/request.service';
import { OperationIndex } from 'src/app/services/utils/operations.index';
import { Item } from '../../model/item';
import { loadDialogDetailsAuxiliar, loadDialogDetailsSuccess, loadDialogDetailsSuccessOnCall } from './dialog.actions';



@Injectable()
export class DialogsEffects {



  constructor(
    private actions$: Actions,
    private _requestService: RequestService) {}

  getRelated$ = createEffect(() => 
  this.actions$.pipe(
    ofType(loadDialogDetailsSuccessOnCall),
    switchMap(({data}: any) => {
    return this._requestService.buildRequest([
      {operation: 
        OperationIndex.GET_RELATED_ITEMS ,
        plain: new Item().setGetRelated({...data})}
      ])
    }
      )), { dispatch: false });


}
