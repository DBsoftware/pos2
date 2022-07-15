import { Action, createReducer, on } from '@ngrx/store';
import { clearActiveChat, loadChatMessageSuccess, loadChatsSuccess } from './chat.actions';


export const chatFeatureKey = 'chat';

export interface State {
  active: any
}

export const initialState: State = {
  active: []
};


export const reducer = createReducer(
  initialState,
  on(loadChatsSuccess, (st, {data}) => ({active: data})),
  on(loadChatMessageSuccess, (st, {data}) => ({active: [...st.active, data]})),
  on(clearActiveChat, (st) => ({active: []}))
);

