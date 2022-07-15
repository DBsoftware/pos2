import { Action, createReducer, on } from '@ngrx/store';
import { Customer, Note } from 'src/app/model/customer';
import { addNote, cleanCustomers, loadCustomerFormValidation, loadCustomersNotesSuccess, loadCustomersSuccess } from './customer.actions';


export const customerFeatureKey = 'customer';

export interface State {
  Customer: Customer,
  valid: boolean,
  notes: Array<Note>
}

export const initialState: State = {
  Customer: new Customer(),
  valid: false,
  notes: []
};


export const reducer = createReducer(
  initialState,
  on(loadCustomersSuccess, (state, {data})=> ({...state,Customer: data})),
  on(loadCustomerFormValidation, (state, {data})=> {
    return ({...state, valid: data})}),
  on(loadCustomersNotesSuccess, (state, {data})=> ({...state, notes: data})),
  on(addNote, (state, {data})=> ({...state, notes: [...state.notes,data]})),
  on(cleanCustomers, (state)=> {
    console.log('clean reducer')
    return ({ notes: [], Customer: new Customer(), valid: false})}),
);

