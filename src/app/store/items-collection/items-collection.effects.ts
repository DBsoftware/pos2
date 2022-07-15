import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GetItems } from 'src/app/model/item';
import { OperationIndex } from 'src/app/services/utils/operations.index';
import { RequestService } from 'src/app/services/api/request.service';
import { loadItemsCollections, selectItemFromCollection } from './items-collection.actions';
import { Store } from '@ngrx/store';
import { ManagerState } from '..';



@Injectable()
export class ItemsCollectionEffects {

  


  constructor(private actions$: Actions, private _requestService: RequestService, private store: Store<ManagerState>) {}


  updateTable$ = createEffect(() => 
  this.actions$.pipe(
    ofType(loadItemsCollections),
    switchMap(({data}: any) => {
    return this._requestService.buildRequest([
      {operation: 
        OperationIndex.GET_ITEMS ,
        plain: new GetItems().setGetItem(data)}
      ])
    }
      )), { dispatch: false });

}
