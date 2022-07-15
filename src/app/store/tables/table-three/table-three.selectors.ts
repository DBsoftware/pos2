import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromTableCustomer from './table-three.reducer'

export const selectTableCustomerState =
    createFeatureSelector<FromTableCustomer.State>("tableCustomers");

    export const selectAllCustomersForTable = createSelector(
        selectTableCustomerState,
        FromTableCustomer.selectAllCustomers
      );
    export const selectTotalCustomersOnTable = createSelector(
        selectTableCustomerState,
        FromTableCustomer.selectTotalCustomers
      );
    export const selectTotalCustomersOnTableLabel = createSelector(
        selectTotalCustomersOnTable,
        (st) => st.toString()
      );
    export const selectCustomersOfTable = createSelector(
        selectTableCustomerState,
        FromTableCustomer.selectCustomers
      );
    export const selectCustomer = createSelector(
      selectCustomersOfTable,
      (entities, props) => entities[props.id]
    );
    
    export const selectCustomersByID = createSelector(
      selectCustomersOfTable,
      (entities, props) => props.ids.map(id => entities[id])
    );
    export const getIds = createSelector(
      selectTableCustomerState,
      FromTableCustomer.selectCustomersIds,
    );
    export const isACustomer = createSelector(
      getIds,
      (ids, props) => ids.includes(props.id)
    );


