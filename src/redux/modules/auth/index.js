import { createSelector } from 'reselect'

// Input-selectors
const sessionSelector = state => state.auth.session
const uiSelector = state => state.auth.ui
export const authLoadingSelector = state => uiSelector(state).loading
export const meSelector = state => sessionSelector(state).me
export const loginModelSelector = state => state.auth.loginModel
export const loginFormSelector = state => state.auth.loginForm
export const signupModelSelector = state => state.auth.signupModel
export const signupFormSelector = state => state.auth.signupForm

// Transform functions

// Memoized selectors
