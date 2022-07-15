import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromTableMessages from './messages-table.reducer'

export const selectTableMessagesState =
    createFeatureSelector<FromTableMessages.State>("messagesTables");

    export const selectAllMessages = createSelector(
      selectTableMessagesState,
      FromTableMessages.selectAllMessages,
       );
