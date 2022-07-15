import { createAction, props } from '@ngrx/store';
import { listAuxiliars } from './auxiliars.models';
import { GlobalParam } from '../../model/global-param';

export const loadGlobalAuxiliars = createAction(
  '[Auxiliars] Load global Auxiliars',
  props<{ data: any }>()
);
export const loadDeliveryMethodsSuccess = createAction(
  '[Auxiliars] Load DeliveryMethods Success',
  props<{ data: any }>()
);
export const loadSeatingAreaSuccess = createAction(
  '[Auxiliars] Load SeatingArea Success',
  props<{ data: any }>()
);
export const ClearSeatingAreaSuccess = createAction(
  '[Auxiliars] clear SeatingArea Success',
);
export const preLoadTableSeatingAreaSuccess = createAction(
  '[Auxiliars] pre Load TableSeatingArea Success',
  props<{ data: any }>()
);
export const loadTableSeatingAreaSuccess = createAction(
  '[Auxiliars] Load TableSeatingArea Success',
  props<{ data: any }>()
);
export const ClearTableSeatingAreaSuccess = createAction(
  '[Auxiliars] clear TableSeatingArea Success',
);
export const loadErrorsSuccess = createAction(
  '[Auxiliars] Load errors Success',
  props<{ data: any }>()
);
export const ClearErrorsSuccess = createAction(
  '[Auxiliars] clear errors Success',
);

export const loadGlobalAuxiliarsSuccess = createAction(
  '[Auxiliars] Load global Auxiliars Success',
  props<{ data: GlobalParam }>()
);
export const loadGlobalAuxiliarsFailure = createAction(
  '[Auxiliars] Load global Auxiliars Fail',
  props<{ data: any }>()
);
export const loadCategoriesAuxiliars = createAction(
  '[Auxiliars] Load Categories Auxiliars',
  props<{ data: any }>()
);
export const loadCategoriesAuxiliarsSuccess = createAction(
  '[Auxiliars] Load Categories Auxiliars Success',
  props<{ data: any }>()
);
export const loadCategoriesAuxiliarsFailure = createAction(
  '[Auxiliars] Load Categories Auxiliars Fail',
  props<{ data: any }>()
);

export const loadListAuxiliars = createAction(
  '[Auxiliars] Load List Auxiliars Success',
  props<{ data: listAuxiliars }>()
);

export const clearListAuxiliars = createAction(
  '[Auxiliars] Clear List Auxiliars',
);
export const initiatedAuxiliars = createAction(
  '[Auxiliars] Initiated Auxiliars',
  props<{ data: any }>()
);

export const loadCoordinatesAuxiliarsSuccess = createAction(
  '[Auxiliars] Load Coordinates Auxiliars Success',
  props<{ data: any }>()
);

export const loadMerchantCategories = createAction(
  '[InitControl] Load merchnat categories',
  props<{ data: any }>()
);
export const loadMerchantCategoriesSuccess = createAction(
  '[InitControl] Load merchnat categories Success',
  props<{ data: any }>()
);
export const loadMerchantCategoriesFail = createAction(
  '[InitControl] Load merchnat categories Fail',
  props<{ data: any }>()
);

export const loadMessagesTotal = createAction(
  '[Messages] Load on Messages Total',
  props<{ data: any }>()
);
;
export const clearMessagesTotal = createAction(
  '[Messages] Clear Cart',
  // props<{ error: any }>()
);

export const loadPromotionsSuccess = createAction(
  '[Auxiliars] Load Promotion Success',
  props<{ data: any }>()
);
export const loadAssignsSuccess = createAction(
  '[Auxiliars] Load Assigns Success',
  props<{ data: any }>()
);
export const loadCalendaruccess = createAction(
  '[Auxiliars] Load Ca Success',
  props<{ data: any }>()
);
export const addCalendaruccess = createAction(
  '[Auxiliars] Load add Ca Success',
  props<{ data: any }>()
);
export const addCalendarIdSuccess = createAction(
  '[Auxiliars] Load add Ca Id Success',
  props<{ data: any }>()
);
export const loadCalendarSelectedSuccess = createAction(
  '[Auxiliars] Load Ca Selected Success',
  props<{ data: any }>()
);
