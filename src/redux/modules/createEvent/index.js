import { createSelector } from 'reselect'

// Input-selectors
const moduleSelector = state => state.createEvent
const formSelector = state => moduleSelector(state).form
export const modelSelector = state => moduleSelector(state).model

const uiSelector = state => moduleSelector(state).ui
export const thumbnailSelector = state => uiSelector(state).thumbnail

// Transform functions

// Memoized selectors
