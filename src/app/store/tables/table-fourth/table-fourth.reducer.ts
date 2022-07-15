import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TableFourthActions from './table-fourth.actions';
import { Order } from 'src/app/model/order';

export const tableFourthsFeatureKey = 'tableFourths';

export interface State extends EntityState<Order> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(TableFourthActions.addTableFourth,
    (state, action) => adapter.addOne(action.tableFourth, state)
  ),
  on(TableFourthActions.upsertTableFourth,
    (state, action) => adapter.upsertOne(action.tableFourth, state)
  ),
  on(TableFourthActions.addTableFourths,
    (state, action) => adapter.addMany(action.tableFourths, state)
  ),
  on(TableFourthActions.upsertTableFourths,
    (state, action) => adapter.upsertMany(action.tableFourths, state)
  ),
  on(TableFourthActions.updateTableFourth,
    (state, action) => adapter.updateOne(action.tableFourth, state)
  ),
  on(TableFourthActions.updateTableFourths,
    (state, action) => adapter.updateMany(action.tableFourths, state)
  ),
  on(TableFourthActions.deleteTableFourth,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(TableFourthActions.deleteTableFourths,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TableFourthActions.loadTableFourths,
    (state, action) => adapter.setAll(action.tableFourths, state)
  ),
  on(TableFourthActions.clearTableFourths,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllOrdersFourth = selectAll;
export const selectTotalOrdersFourth = selectTotal;
export const selectOrdersFourth = selectEntities;
