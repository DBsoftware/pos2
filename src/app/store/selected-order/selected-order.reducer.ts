import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/model/order';
import { updateOrder, loadFormValidation, loadSelectedOrdersSuccess, clearSelected } from './selected-order.actions';


export const selectedOrderFeatureKey = 'selectedOrder';

export interface State {
  order: Order
  isValidAddOrder: boolean
}

export const initialState: State = {
  order: new Order(),
  isValidAddOrder: false
};


export const reducer = createReducer(
  initialState,
  on(loadSelectedOrdersSuccess, (state, {data})=> ({...state,order: data})),
  on(loadFormValidation, (state, {data})=> ({...state,isValidAddOrder: data})),
  on(clearSelected, (state)=> ({...state,order: new Order()})),
  on(updateOrder, (state, {data})=> {
    let aux1 = Object.keys(data).map(e => data[e]?({[e]:data[e]}): null).filter(e=> !!e).reduce((total, current)=> ({...total, ...current}), {})
    let aux2 = new Order().setOrder({...state.order, ...aux1})
    console.log('update',data, state.order, aux2)
    return {...state,order: aux2}
  }),
);

