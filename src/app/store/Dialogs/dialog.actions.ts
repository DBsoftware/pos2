import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/model/order';

export const loadDialogTwo = createAction(
  '[Dialog] Load Dialog Two'
);

export const loadDialogOne = createAction(
  '[Dialog] Load Dialog One'
);
export const loadDialogReceipt = createAction(
  '[Dialog] Load Dialog Receipt'
);
export const loadDialogDetails = createAction(
  '[Dialog] Load Dialog Details'
);

export const loadDialogDetailsSuccess = createAction(
  '[Dialog] Load Dialog Details Success',
  props<{ data: any }>()
);
export const loadDialogDetailsSuccessOnCall = createAction(
  '[Dialog] Load Dialog Details Success on call',
  props<{ data: any }>()
);
export const loadDialogDetailsAuxiliar = createAction(
  '[Dialog] Load Dialog DetailsAuxiliar',
  props<{ data: any }>()
);

export const loadDialogDetailsAuxiliarSuccess = createAction(
  '[Dialog] Load Dialog DetailsAuxiliar Success',
  props<{ data: any }>()
);

export const loadDialogOneSuccess = createAction(
  '[Dialog] Load Dialog One Success',
  props<{ data:  any }>()
);
export const loadDialogReceiptSuccess = createAction(
  '[Dialog] Load Dialog Receipt Success',
  props<{ data:  any }>()
);

export const loadDialogTwoSuccess = createAction(
  '[Dialog] Load Dialog Two Success',
  props<{ data:  any }>()
);
export const loadDialogManualSuccess = createAction(
  '[Dialog] Load Dialog Manual Success',
  props<{ data:  any }>()
);

export const loadDialogFailure = createAction(
  '[Dialog] Load Dialog Details Failure',
  props<{ error: any }>()
);

export const loadDialogOneFailure = createAction(
  '[Dialog] Load Dialog One Failure',
  props<{ error: any }>()
);
export const loadDialogReceiptFailure = createAction(
  '[Dialog] Load Dialog Receipt Failure',
  props<{ error: any }>()
);

export const loadDialogTwoFailure = createAction(
  '[Dialog] Load Dialog Two Failure',
  props<{ error: any }>()
);


export const openDialogDetailsSuccess = createAction(
  '[Dialog] open Dialog Details Success',
  props<{ data: boolean }>()
);

export const openDialogOneSuccess = createAction(
  '[Dialog] open Dialog One Success',
  props<{ data:  boolean }>()
);
export const openDialogReceiptSuccess = createAction(
  '[Dialog] open Dialog Receipt Success',
  props<{ data:  boolean }>()
);

export const openDialogTwoSuccess = createAction(
  '[Dialog] open Dialog Two Success',
  props<{ data:  boolean }>()
);
export const openDialogManualSuccess = createAction(
  '[Dialog] open Dialog manual Success',
  props<{ data:  boolean }>()
);
export const openDialogOptionsSuccess = createAction(
  '[Dialog] open Dialog options Success',
  props<{ data:  boolean }>()
);

export const loadDialogOptionsSuccess = createAction(
  '[Dialog] Load Dialog options Success',
  props<{ data:  any }>()
);

export const openQrDialog = createAction(
  '[Dialog] open Qr Dialog',
  props<{ data: boolean }>()
);
