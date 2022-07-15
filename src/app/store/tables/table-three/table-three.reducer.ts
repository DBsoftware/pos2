import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TableThreeActions from './table-three.actions';
import { Customer } from 'src/app/model/customer';

export const tableThreesFeatureKey = 'tableCustomers';

export interface State extends EntityState<Customer> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
  selectId: (model: Customer) => model.customer_phone_number,

});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(TableThreeActions.addTableThree,
    (state, action) => adapter.addOne(action.tableThree, state)
  ),
  on(TableThreeActions.upsertTableThree,
    (state, action) => adapter.upsertOne(action.tableThree, state)
  ),
  on(TableThreeActions.addTableThrees,
    (state, action) => adapter.addMany(action.tableThrees, state)
  ),
  on(TableThreeActions.upsertTableThrees,
    (state, action) => adapter.upsertMany(action.tableThrees, state)
  ),
  on(TableThreeActions.updateTableThree,
    (state, action) => adapter.updateOne(action.tableThree, state)
  ),
  on(TableThreeActions.updateTableThrees,
    (state, action) => adapter.updateMany(action.tableThrees, state)
  ),
  on(TableThreeActions.deleteTableThree,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(TableThreeActions.deleteTableThrees,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TableThreeActions.loadTableThrees,
    (state, action) => adapter.setAll(action.tableThrees, state)
  ),
  on(TableThreeActions.clearTableThrees,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllCustomers = selectAll;
export const selectTotalCustomers = selectTotal;
export const selectCustomers = selectEntities;
export const selectCustomersIds = selectIds;