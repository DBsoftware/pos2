import { Action, createReducer, on } from '@ngrx/store';
import { __values } from 'tslib';
import { AddFormsValue, cleanForm, loadFormsStatus, loadFormsValue } from './form.actions';


export const formFeatureKey = 'form';

export interface State {
  value: any
  valid: boolean
}

export const initialState: State = {
  value: null,
  valid: false
};

export const reducer = createReducer(
  initialState,
  on(loadFormsStatus, (st, {data}) => ({...st, valid: data})),
  on(loadFormsValue, (st, {data}) => ({...st, value: data})),
  on(AddFormsValue, (st, {data}) => ({...st, value: {...st.value, ...data}})),
  on(cleanForm, (st) => ({  value: null,valid: false})),
);
