import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromItemsReducer from './items.reducer'

export const selectItemsState =
    createFeatureSelector<fromItemsReducer.State>("items");
    
    export const getWholeItemState = createSelector(
        selectItemsState,
        (st) => st
    )
    export const getActivePosition = createSelector(
        selectItemsState,
        (st) => st.position
    )
    export const getRow = createSelector(
        selectItemsState,
        (st) => st.row
    )
    export const getTotal = createSelector(
        selectItemsState,
        (st) => st.total
    )