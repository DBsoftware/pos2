import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromChatsReducers from './chat.reducer'

export const selecChatsState =
    createFeatureSelector<fromChatsReducers.State>("chat");

    export const getActiveChat = createSelector(
      selecChatsState,
      (st) => st.active
  )
    export const getFisrtMessage = createSelector(
      selecChatsState,
      (st) => st.active.length > 0? st.active[0]:null
  )
