import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from 'src/app/model/order';
import * as FromTableItems from './table-two.reducer'

export const selectTableItemsState =
    createFeatureSelector<FromTableItems.State>("tableItems");

    export const selectAllItemsForTable = createSelector(
        selectTableItemsState,
        FromTableItems.selectAllItems
      );

      export const selectTotalItemsOnTable = createSelector(
        selectTableItemsState,
        FromTableItems.selectTotalItems
      );

