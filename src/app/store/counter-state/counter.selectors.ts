import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCounterReducer from './counter.reducer'

export const selectCountersState =
    createFeatureSelector<fromCounterReducer.State>("counter");

    export const getWay = createSelector(
        selectCountersState,
        (st) => st.way
    )
    export const getisSecond = createSelector(
        getWay,
        (e) => e.includes('second')
    )
    export const getSubtitle = createSelector(
        selectCountersState,
        (st) => st.subtitle
    )