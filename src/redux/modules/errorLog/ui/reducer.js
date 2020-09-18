import types from 'redux/types'
import { dropLast } from 'ramda'
import { OneTimeUserError, AuthSagaError, StreamsSagaError } from 'redux/errors'

const initialState = {
  oneTimeErrors: []
}

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.UI_ERROR_MODAL_CLOSED:
      return state => ({
        oneTimeErrors: dropLast(1, state.oneTimeErrors)
      })
    default:
      break
  }

  if (payload instanceof OneTimeUserError
  || payload instanceof AuthSagaError
  || payload instanceof StreamsSagaError) {
    return state => ({oneTimeErrors: state.oneTimeErrors.concat(payload)})
  }

  return undefined
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
