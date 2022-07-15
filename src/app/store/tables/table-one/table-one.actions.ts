import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Order } from 'src/app/model/order';

export const preloadTableOrders = createAction(
  '[TableOrder/API] pre Load TableOrders', 
  props<{ data: any }>()
);
export const addSelectedOrder = createAction(
  '[TableOrder/API] addSelectedOrder TableOrders', 
  props<{ data: any }>()
);
export const loadTableOrders = createAction(
  '[TableOrder/API] Load TableOrders', 
  props<{ tableOrders: Order[] }>()
);

export const addTableOrder = createAction(
  '[TableOrder/API] Add TableOrder',
  props<{ tableOrder: Order }>()
);

export const upsertTableOrder = createAction(
  '[TableOrder/API] Upsert TableOrder',
  props<{ tableOrder: Order }>()
);

export const addTableOrders = createAction(
  '[TableOrder/API] Add TableOrders',
  props<{ tableOrders: Order[] }>()
);

export const upsertTableOrders = createAction(
  '[TableOrder/API] Upsert TableOrders',
  props<{ tableOrders: Order[] }>()
);

export const updateTableOrder = createAction(
  '[TableOrder/API] Update TableOrder',
  props<{ tableOrder: Update<Order> }>()
);

export const updateTableOrders = createAction(
  '[TableOrder/API] Update TableOrders',
  props<{ tableOrders: Update<Order>[] }>()
);

export const deleteTableOrder = createAction(
  '[TableOrder/API] Delete TableOrder',
  props<{ id: string }>()
);

export const deleteTableOrders = createAction(
  '[TableOrder/API] Delete TableOrders',
  props<{ ids: string[] }>()
);

export const clearTableOrders = createAction(
  '[TableOrder/API] Clear TableOrders'
);

export const TableFailure = createAction(
  '[TableOrder/API] TableFailure',
);
