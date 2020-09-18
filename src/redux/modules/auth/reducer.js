import immu from 'immu'
import { actionTypes, formReducer } from 'react-redux-form'
import types from 'redux/types'
import ui from './ui/reducer'
import session from './session/reducer'
import loginModel from './loginModel/reducer'
import signupModel from './signupModel/reducer'

const initialState = {
  session: session(),
  ui: ui(),
  loginModel: loginModel(),
  signupModel: signupModel(),
  loginForm: formReducer('loginForm')(undefined, {}),
  signupForm: formReducer('signupForm')(undefined, {})
}

function actionToTransition(action) {
  switch (action.type) {
    case actionTypes.CHANGE:
      return state => ({
        loginModel: loginModel(state.loginModel, action),
        signupModel: signupModel(state.signupModel, action)
      })
    case types.UI_LOGIN_FORM_SUBMITTED:
    case types.UI_AUTH_FACEBOOK_CLICKED:
      return state => ({
        ui: ui(state.ui, action)
      })
    case types.SAGA_ERROR:
      return state => ({
        ui: ui(state.ui, action)
      })
    case types.SAGA_AUTH_LOGOUT:
      return state => ({
        session: session(state.session, action)
      })
    case types.SAGA_AUTH_RESPONSE:
    case types.SAGA_AUTH_FACEBOOK_RESPONSE:
      return state => ({
        session: session(state.session, action),
        ui: ui(state.ui, action)
      })
    default:
      return undefined
  }
}

export default function auth(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return immu({...state, ...transition(state)})
}
