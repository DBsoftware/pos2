import { Action, createReducer, on } from '@ngrx/store';
import { Business } from 'src/app/model/business';
import { User } from 'src/app/model/user';
import * as userActions from './user.actions';


export const userFeatureKey = 'user';


export const initialState: Business = new Business();

const userReducer = createReducer(
  initialState,
  on(userActions.loadUserSuccess,  (state, {data}) =>  (data)),
  on(userActions.loadUserLocationSuccess,  (state, {data}) =>  {
    let aux = new Business().setBusiness(state)
    aux.location_id = data
    return aux
  }),
  on(userActions.loadUserDepartmentSuccess,  (state, {data}) =>  {
    let aux = new Business().setBusiness(state)
    aux.department = data
    return aux
  }),
  on(userActions.clearUser,  (state) =>  new Business())
);

export function reducer(state: Business | undefined, action: Action) {
  return userReducer(state, action);
}


