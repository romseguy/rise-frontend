import types from 'redux/types'
import { AuthSagaError } from 'redux/errors'

const initialState = {
  loading: false
}

const setLoading = bool => state => ({loading: bool})

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.UI_LOGIN_FORM_SUBMITTED:
    case types.UI_AUTH_FACEBOOK_CLICKED:
      return setLoading(true)
    case types.SAGA_AUTH_RESPONSE:
    case types.SAGA_AUTH_FACEBOOK_RESPONSE:
      return setLoading(false)
    case types.SAGA_ERROR:
      if (payload instanceof AuthSagaError) {
        return setLoading(false)
      }
      return undefined
    default:
      return undefined
  }
}

export default function ui(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return {
    ...state,
    ...transition(state)
  }
}
