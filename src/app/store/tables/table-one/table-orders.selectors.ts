import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from 'src/app/model/order';
import * as FromTableOrder from './table-one.reducer'

export const selectTableOrderState =
    createFeatureSelector<FromTableOrder.State>("tableOrders");

    export const selectAllOrdersForTable = createSelector(
        selectTableOrderState,
        FromTableOrder.selectAllOrders
      );
    export const selectTotalOrdersOnTable = createSelector(
        selectTableOrderState,
        FromTableOrder.selectTotalOrders
      );
    export const selectTotalOrdersOnTableLabel = createSelector(
        selectTotalOrdersOnTable,
        (st) => st.toString()
      );
    export const selectOrdersOfTable = createSelector(
        selectTableOrderState,
        FromTableOrder.selectOrders
      );
    export const selectOrder = createSelector(
      selectOrdersOfTable,
      (entities, props) => entities[props.id]
    );
    
    export const selectOrdersByID = createSelector(
      selectOrdersOfTable,
      (entities, props) => props.ids.map(id => entities[id])
    );


