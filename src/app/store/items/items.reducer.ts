import { Action, createReducer, on } from '@ngrx/store';
import { loadActivePositionSuccess, loadActiveRowsSuccess,loadTotalSuccess } from './items.actions';


export const itemsFeatureKey = 'items';

export interface State {
  position:any,
  row:Array<any>,
  total: number
}

export const initialState: State = {
  position:null,
  row:[],
  total: 0
};


export const reducer = createReducer(
  initialState,
  on(loadActivePositionSuccess, (state, data) => ({...state, position: data.data})),
  on(loadActiveRowsSuccess, (state, data) => ({...state, row: data.data})),
  on(loadTotalSuccess, (state, data) => ({...state, total: data.data}))
);

