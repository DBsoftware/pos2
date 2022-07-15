import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDetailsReducer from './dialog.reducer'

export const selectDialogsState =
    createFeatureSelector<fromDetailsReducer.State>("dialogs");

    export const getDialogState = createSelector(
        selectDialogsState,
        (st) => st
    )
    export const getDetails = createSelector(
        selectDialogsState,
        (st) => st.details
    )
    export const getDetailsAuxiliar = createSelector(
        selectDialogsState,
        (st) => ({category_Name: 'Related Items', PC:st.detailsAuxiliar })
    )
    export const getOne = createSelector(
        selectDialogsState,
        (st) => st.one
    )
    export const getReceipt = createSelector(
        selectDialogsState,
        (st) => st.receipt
    )
    export const getTwo = createSelector(
        selectDialogsState,
        (st) => st.two
    )
    export const getOptions = createSelector(
        selectDialogsState,
        (st) => st.options
    )
    export const getManual = createSelector(
        selectDialogsState,
        (st) => st.manual
    )
    export const getDetailsOpenstate = createSelector(
        selectDialogsState,
        (st) => st.openDetails
    )
    export const getOneOpenState = createSelector(
        selectDialogsState,
        (st) => st.openOne
    )
    export const getTwoOpenState = createSelector(
        selectDialogsState,
        (st) => st.openTwo
    )
    export const getManualOpenState = createSelector(
        selectDialogsState,
        (st) => st.openManual
    )
    export const getOptionsOpenState = createSelector(
        selectDialogsState,
        (st) => st.openOptions
    )
    export const getReceiptOpenState = createSelector(
        selectDialogsState,
        (st) => st.openReceipt
    )
    export const getQrOpenState = createSelector(
        selectDialogsState,
        (st) => st.openQr
    )
