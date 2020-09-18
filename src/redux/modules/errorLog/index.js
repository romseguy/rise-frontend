import { createSelector } from 'reselect'
import immu from 'immu'

// Input-selectors
const moduleSelector = state => state.errorLog

const uiSelector = state => moduleSelector(state).ui
export const oneTimeErrorsSelector = state => uiSelector(state).oneTimeErrors

// Transform functions
function getLatest(array) {
  return array.length > 0 ? array[array.length - 1] : immu({})
}

// Memoized selectors
export const latestOneTimeErrorSelector = createSelector(
  oneTimeErrorsSelector,
  (errors) => getLatest(errors)
)
