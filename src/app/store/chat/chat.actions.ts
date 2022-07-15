import { createAction, props } from '@ngrx/store';

export const loadChats = createAction(
  '[Chat] Load Chats',
  props<{ data: any }>()
);

export const loadChatsSuccess = createAction(
  '[Chat] Load Chats Success',
  props<{ data: any }>()
);
export const loadChatMessageSuccess = createAction(
  '[Chat] Load chat Message Success',
  props<{ data: any }>()
);

export const loadChatsFailure = createAction(
  '[Chat] Load Chats Failure',
  props<{ error: any }>()
);
export const clearActiveChat = createAction(
  '[Chat] Clear Chats'
);
