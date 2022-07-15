import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/model/order';

export const loadSelectedOrders = createAction(
  '[SelectedOrder] Load SelectedOrders'
);
export const loadFormValidation = createAction(
  '[SelectedOrder] loadFormValidation',
  props<{ data: boolean }>()
);
export const updateOrder = createAction(
  '[SelectedOrder] updateOrder',
  props<{ data: Order}>()
);
export const addNewOrder = createAction(
  '[SelectedOrder] addNewOrder',
  props<{ data: any }>()
);

export const loadSelectedOrdersSuccess = createAction(
  '[SelectedOrder] Load SelectedOrders Success',
  props<{ data: Order }>()
);

export const loadSelectedOrdersFailure = createAction(
  '[SelectedOrder] Load SelectedOrders Failure',
  props<{ error: any }>()
);
export const clearSelected = createAction(
  '[SelectedOrder] clearSelected'
  );