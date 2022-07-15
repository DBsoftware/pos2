import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TableOrderActions from './table-one.actions';
import { Order } from 'src/app/model/order';

export const tableOrdersFeatureKey = 'tableOrders';

export interface State extends EntityState<Order> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(TableOrderActions.addTableOrder,
    (state, action) => adapter.addOne(action.tableOrder, state)
  ),
  on(TableOrderActions.upsertTableOrder,
    (state, action) => adapter.upsertOne(action.tableOrder, state)
  ),
  on(TableOrderActions.addTableOrders,
    (state, action) => adapter.addMany(action.tableOrders, state)
  ),
  on(TableOrderActions.upsertTableOrders,
    (state, action) => adapter.upsertMany(action.tableOrders, state)
  ),
  on(TableOrderActions.updateTableOrder,
    (state, action) => {
      console.log(action.tableOrder,'here')
      return adapter.updateOne(action.tableOrder, state)}
  ),
  on(TableOrderActions.updateTableOrders,
    (state, action) => adapter.updateMany(action.tableOrders, state)
  ),
  on(TableOrderActions.deleteTableOrder,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(TableOrderActions.deleteTableOrders,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TableOrderActions.loadTableOrders,
    (state, action) => adapter.setAll(action.tableOrders, state)
  ),
  on(TableOrderActions.clearTableOrders,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllOrders = selectAll;
export const selectTotalOrders = selectTotal;
export const selectOrders = selectEntities;
