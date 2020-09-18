import { createSelector } from 'reselect'

// Input-selectors
const uiSelector = state => state.i18n.ui
export const currentLanguageSelector = state => uiSelector(state).currentLanguage

// Transform functions

// Memoized selectors
