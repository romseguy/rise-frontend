import { createSelector } from 'reselect'
import immu from 'immu'
import { meSelector } from 'redux/modules/auth'

// Input-selectors
const usersSelector = state => state.users
export const meUserSelector = state => usersSelector(state)[meSelector(state).username] || immu({})

// Transform functions

// Memoized selectors
