import { createAction, props } from '@ngrx/store';

export const loadActiveRows = createAction(
  '[Items] Load Active Rows'
);

export const loadActiveRowsSuccess = createAction(
  '[Items] Load Active Rows Success',
  props<{ data: any }>()
);

export const loadActiveRowsFailure = createAction(
  '[Items] Load Active Rows Failure',
  props<{ error: any }>()
);
export const loadActivePosition = createAction(
  '[Items] Load Active Position'
);

export const loadActivePositionSuccess = createAction(
  '[Items] Load Active Position Success',
  props<{ data: any }>()
);

export const loadActivePositionFailure = createAction(
  '[Items] Load Active Position Failure',
  props<{ error: any }>()
);
export const loadTotalSuccess = createAction(
  '[Items] Load  Total Success',
  props<{ data: any }>()
);
