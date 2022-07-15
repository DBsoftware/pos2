import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Customer } from 'src/app/model/customer';

export const loadTableThrees = createAction(
  '[TableThree/API] Load TableThrees', 
  props<{ tableThrees: Customer[] }>()
);

export const addTableThree = createAction(
  '[TableThree/API] Add TableThree',
  props<{ tableThree: Customer }>()
);

export const upsertTableThree = createAction(
  '[TableThree/API] Upsert TableThree',
  props<{ tableThree: Customer }>()
);

export const addTableThrees = createAction(
  '[TableThree/API] Add TableThrees',
  props<{ tableThrees: Customer[] }>()
);

export const upsertTableThrees = createAction(
  '[TableThree/API] Upsert TableThrees',
  props<{ tableThrees: Customer[] }>()
);

export const updateTableThree = createAction(
  '[TableThree/API] Update TableThree',
  props<{ tableThree: Update<Customer> }>()
);

export const updateTableThrees = createAction(
  '[TableThree/API] Update TableThrees',
  props<{ tableThrees: Update<Customer>[] }>()
);

export const deleteTableThree = createAction(
  '[TableThree/API] Delete TableThree',
  props<{ id: string }>()
);

export const deleteTableThrees = createAction(
  '[TableThree/API] Delete TableThrees',
  props<{ ids: string[] }>()
);

export const clearTableThrees = createAction(
  '[TableThree/API] Clear TableThrees'
);
