import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';
import { ManagerState } from '..';
import { loadItemsCollections } from '../items-collection/items-collection.actions';
import { getUserState } from '../user/user.selectors';
import { loadCountersSuccess } from './counter.actions';



@Injectable()
export class CounterEffects {
  
  constructor(
    private actions$: Actions,
    private store: Store<ManagerState>
    ) {}

  loadItems$ = createEffect(() => 
  this.actions$.pipe(
    ofType(loadCountersSuccess),
    switchMap(({value}) => this.store.select(getUserState)
    .pipe(tap((user_info: any) => {
      return value.includes('second') ? this.store.dispatch(loadItemsCollections({data: user_info}))
      : of(null)
      }
      ))
    ),
    ), { dispatch: false });

}
