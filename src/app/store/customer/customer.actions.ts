import { createAction, props } from '@ngrx/store';

export const loadCustomers = createAction(
  '[Customer] Load Customers'
);

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ data: any }>()
);
export const loadCustomersNotesSuccess = createAction(
  '[Customer] Load Customers Note Success',
  props<{ data: any }>()
);
export const cleanCustomers = createAction(
  '[Customer] Clean Customers '
);
export const loadCustomerFormValidation = createAction(
  '[Customer] Load Customers Form Success',
  props<{ data: any }>()
);
export const addNote = createAction(
  '[Customer] add note Success',
  props<{ data: any }>()
);

export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: any }>()
);
