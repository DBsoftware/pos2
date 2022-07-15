import { createReducer, on } from '@ngrx/store';
import {
  loadDialogDetailsSuccess,
  loadDialogManualSuccess,
  loadDialogOneSuccess,
  loadDialogTwoSuccess,
  openDialogDetailsSuccess,
  openDialogOneSuccess,
  openDialogTwoSuccess,
  openDialogReceiptSuccess,
  openDialogManualSuccess,
  loadDialogOptionsSuccess,
  openDialogOptionsSuccess,
  loadDialogReceiptSuccess,
  loadDialogDetailsAuxiliarSuccess,
  loadDialogDetailsSuccessOnCall,
  openQrDialog
} from './dialog.actions';


export const detailsFeatureKey = 'dialogs';


export interface State {
  details: any,
  detailsAuxiliar: any
  one: any,
  two: any,
  manual: any,
  options: any,
  receipt: any,
  openDetails: any,
  openReceipt: any,
  openOne: any,
  openTwo: any,
  openManual: any,
  openOptions: any,
  openQr: any
}

export const initialState: State = {
  details: null,
  detailsAuxiliar: [],
  one: null,
  two: null,
  manual: null,
  options: null,
  receipt: null,
  openDetails: false,
  openReceipt: false,
  openOne: false,
  openTwo: false,
  openManual: false,
  openOptions: false,
  openQr: false
};


export const reducer = createReducer(
  initialState,
  on(loadDialogDetailsSuccess, (state, newState) => ({...state, details:newState.data})),
  on(loadDialogDetailsSuccessOnCall, (state, newState) => ({...state, details:newState.data})),
  on(loadDialogDetailsAuxiliarSuccess, (state, newState) => ({...state, detailsAuxiliar:newState.data})),
  on(loadDialogOneSuccess, (state, newState) => ({...state, one: newState.data})),
  on(loadDialogReceiptSuccess, (state, newState) => ({...state, receipt: newState.data})),
  on(loadDialogTwoSuccess, (state, newState) => ({...state, two: newState.data})),
  on(loadDialogOptionsSuccess, (state, newState) => ({...state, options: newState.data})),
  on(loadDialogManualSuccess, (state, newState) => ({...state, manual: newState.data})),
  on(openDialogDetailsSuccess, (state, newState) => ({...state, openDetails:newState.data})),
  on(openDialogOneSuccess, (state, newState) => ({...state, openOne: newState.data})),
  on(openDialogReceiptSuccess, (state, newState) => ({...state, openReceipt: newState.data})),
  on(openDialogTwoSuccess, (state, newState) => ({...state, openTwo: newState.data})),
  on(openDialogManualSuccess, (state, newState) => ({...state, openManual: newState.data})),
  on(openDialogOptionsSuccess, (state, newState) => ({...state, openOptions: newState.data})),
  on(openQrDialog, (state, newState) => ({...state, openQr: newState.data})),
);

