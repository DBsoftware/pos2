import { createAction, props } from '@ngrx/store';
import { Business } from 'src/app/model/business';

export const loadUser = createAction(
  '[User] Load User'
);
export const clearUser = createAction(
  '[User] Load User'
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ data: Business }>()
);
export const loadUserLocationSuccess = createAction(
  '[User] Load User Loaction Success',
  props<{ data: any }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const loadUserDepartmentSuccess = createAction(
  '[User] Load User Department Success',
  props<{ data: any }>()
);


