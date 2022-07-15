import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Order } from 'src/app/model/order';

export const loadTableFourths = createAction(
  '[TableFourth/API] Load TableFourths', 
  props<{ tableFourths: Order[] }>()
);

export const addTableFourth = createAction(
  '[TableFourth/API] Add TableFourth',
  props<{ tableFourth: Order }>()
);

export const upsertTableFourth = createAction(
  '[TableFourth/API] Upsert TableFourth',
  props<{ tableFourth: Order }>()
);

export const addTableFourths = createAction(
  '[TableFourth/API] Add TableFourths',
  props<{ tableFourths: Order[] }>()
);

export const upsertTableFourths = createAction(
  '[TableFourth/API] Upsert TableFourths',
  props<{ tableFourths: Order[] }>()
);

export const updateTableFourth = createAction(
  '[TableFourth/API] Update TableFourth',
  props<{ tableFourth: Update<Order> }>()
);

export const updateTableFourths = createAction(
  '[TableFourth/API] Update TableFourths',
  props<{ tableFourths: Update<Order>[] }>()
);

export const deleteTableFourth = createAction(
  '[TableFourth/API] Delete TableFourth',
  props<{ id: string }>()
);

export const deleteTableFourths = createAction(
  '[TableFourth/API] Delete TableFourths',
  props<{ ids: string[] }>()
);

export const clearTableFourths = createAction(
  '[TableFourth/API] Clear TableFourths'
);
