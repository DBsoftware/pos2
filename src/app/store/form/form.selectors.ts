import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFormReducers  from "./form.reducer";
// import { Lead } from '../../model/Lead';

export const selectFormState =
    createFeatureSelector<fromFormReducers.State>("form");

export const getFormValue = createSelector(
    selectFormState,
    (st) => st.value
)
export const getFormValid = createSelector(
    selectFormState,
    (st) => st.valid
)

// Example of props
// export const hasRight = (rightCode: RightCode) => createSelector(selectUser, (user) => {
//   return user?.rights?.indexOf(rightCode) !== -1;
// });

// // you can consume it as
// const canEditClient$ = this.store.select(hasRight(RIGHT_EDIT_CLIENT));
