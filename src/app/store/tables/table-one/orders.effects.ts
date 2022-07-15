import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { OperationIndex } from 'src/app/services/utils/operations.index';
import { RequestService } from 'src/app/services/api/request.service';
import { ManagerState } from '../..';
import { getSelected } from '../../selected-order/selected-order.selectors';
import { addSelectedOrder, preloadTableOrders, addTableOrder, TableFailure } from './table-one.actions';



@Injectable()
export class OrdersEffects {
   
  constructor(
    private store: Store<ManagerState>, 
    private actions$: Actions, 
    private _requestService: RequestService) {}

  callFilter$ = createEffect(() => 
  this.actions$.pipe(
    ofType(preloadTableOrders),
    switchMap(({data}: any) => 
      this._requestService.buildRequest([{operation: OperationIndex.search_orders ,plain: new Order().setOrder(data)}])
    )
    ), { dispatch: false }
    );

    updateTable$ = createEffect(() => 
    this.actions$.pipe(
      ofType(addSelectedOrder),
      switchMap(({data}: any) => this.store.select(getSelected)
        .pipe(take(1),map((data) => addTableOrder({ tableOrder: data })),
        catchError((message) => of(TableFailure())))
        )));

}

