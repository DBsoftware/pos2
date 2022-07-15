import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCustomerReducer from './customer.reducer'

export const selectCustomerState =
    createFeatureSelector<fromCustomerReducer.State>("customer");

    export const getCustomerState = createSelector(
        selectCustomerState,
        (st) => st.Customer
    )
    export const getCustomerFormValidation = createSelector(
        selectCustomerState,
        (st) => st.valid
    )
    export const getCustomerNotes = createSelector(
        selectCustomerState,
        (st) => st.notes.map(e => e.completeNote).join('\n')
    )