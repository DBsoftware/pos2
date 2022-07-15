import { createReducer, on } from '@ngrx/store';
import { Subtitle } from 'src/app/utils/mncTypes-enums';
import { loadCountersSuccess, loadSubtitleSuccess } from './counter.actions';


export const counterFeatureKey = 'counter';

export interface State {
  way: string
  subtitle: string
}

export const initialState: State = {
  way: 'first',
  subtitle: Subtitle.ACTIVE
};


export const reducer = createReducer(
  initialState,
  on(loadCountersSuccess, (state, data)=> ({...state,way: data.value})),
  on(loadSubtitleSuccess, (state, data)=> ({...state,subtitle: data.value}))
);

