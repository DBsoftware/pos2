import { createAction, props } from '@ngrx/store';

export const loadCounters = createAction(
  '[Counter] Load Counters'
);

export const loadSubtitleSuccess = createAction(
  '[Counter] Load Subtitle Success',
  props<{ value: string }>()
);
export const loadCountersSuccess = createAction(
  '[Counter] Load Counters Success',
  props<{ value: string }>()
);

export const loadCountersFailure = createAction(
  '[Counter] Load Counters Failure',
  props<{ error: any }>()
);
