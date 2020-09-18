import { createSelector } from 'reselect'

// Input-selectors
const uiSelector = state => state.newsfeed.ui
export const visibleSelector = state => uiSelector(state).visible
export const streamsSelector = state => state.newsfeed.streams
export const loadingSelector = state => uiSelector(state).loading
export const filterSelector = state => uiSelector(state).newsfeedFilter
export const filterTypeSelector = state => filterSelector(state).type

// Transform functions

// Memoized selectors
