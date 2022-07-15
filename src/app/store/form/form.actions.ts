import { createAction, props } from '@ngrx/store';

export const AddFormsValue = createAction(
  '[Form] Add Forms Value',
  props<{ data: any }>()
);

export const loadFormsValue = createAction(
  '[Form] Load Forms Value',
  props<{ data: any }>()
);
export const loadFormsStatus = createAction(
  '[Form] Load Forms Status',
   props<{ data: any }>()
);
export const cleanForm = createAction(
  '[Form] Clean Forms state'
);




