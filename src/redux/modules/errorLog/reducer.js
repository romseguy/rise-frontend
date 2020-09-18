import immu from 'immu'
import types from 'redux/types'
import api from 'services/api'
import ui from './ui/reducer'

const initialState = {
  ui: ui()
}

function actionToTransition(action) {
  switch (action.type) {
    case types.UI_ERROR_MODAL_CLOSED:
    case types.UI_ERROR_MODAL_OPENED:
    case types.SAGA_ERROR:
      return state => ({
        ui: ui(state.ui, action)
      })
    default:
      if (action.error) {
        return state => ({
          ui: ui(state.ui, action)
        })
      }
      return undefined
  }
}

export default function errorLog(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return immu({
    ...state,
    ...transition(state)
  })
}
