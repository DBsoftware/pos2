import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { OperationIndex } from 'src/app/services/utils/operations.index';
import { RequestService } from 'src/app/services/api/request.service';
import { ManagerState } from '..';
import { addNewOrder } from './selected-order.actions';
import { addSelectedOrder } from '../tables/table-one/table-one.actions';
import { of } from 'rxjs';



@Injectable()
export class SelectedOrderEffects {

   


  constructor(
    private actions$: Actions, 
    private _requestService: RequestService,
    private store: Store<ManagerState>
    ) {}

  // newOrder$ = createEffect(() => this.actions$.pipe(
  //   ofType(addNewOrder),
  //   switchMap(({data}: any) => {
  //     console.log(data)
  //     return of(data)
  //     // return this._requestService.buildRequest([{operation: OperationIndex.Add_New_Order ,plain: new Order().setOrder(data)}])

  //   }
  //   ),tap(e => this.store.dispatch(addSelectedOrder()))
  //   ), { dispatch: false }
  //   );



}
