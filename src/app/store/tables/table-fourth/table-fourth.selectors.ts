import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromTableOrder from './table-fourth.reducer'

export const selectTableOrderState =
    createFeatureSelector<FromTableOrder.State>("tableFourths");

    export const selectAllOrdersFourthTable = createSelector(
        selectTableOrderState,
        FromTableOrder.selectAllOrdersFourth
      );
    export const selectTotalOrdersOnTableFourth = createSelector(
        selectTableOrderState,
        FromTableOrder.selectTotalOrdersFourth
      );
    export const selectTotalOrdersOnTableLabelFourth = createSelector(
        selectTotalOrdersOnTableFourth,
        (st) => st.toString()
      );
    export const selectOrdersOfTableFourth = createSelector(
        selectTableOrderState,
        FromTableOrder.selectOrdersFourth
      );
    export const selectOrderFourth = createSelector(
      selectOrdersOfTableFourth,
      (entities, props) => entities[props.id]
    );
    
    export const selectOrdersByIDFourth = createSelector(
      selectOrdersOfTableFourth,
      (entities, props) => props.ids.map(id => entities[id])
    );


