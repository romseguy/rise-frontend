import { createSelector } from 'reselect'

// Input-selectors
const moduleSelector = state => state.search
const uiSelector = state => moduleSelector(state).ui
export const selectedSuggestSelector = state => uiSelector(state).selectedSuggest
export const searchingSelector = state => uiSelector(state).searching
export const searchValueSelector = state => uiSelector(state).searchValue

// Transform functions

// Memoized selectors
