import ui from './ui/reducer'
import immu from 'immu'
import types from 'redux/types'

const initialState = {
  ui: ui()
}

function actionToTransition(action) {
  switch (action.type) {
    case types.UI_CURRENT_LANGUAGE_SET:
      return state => ({
        ui: ui(state.ui, action)
      })
    default:
      return undefined
  }
}

export default function i18n(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return immu({...state, ...transition(state)})
}
