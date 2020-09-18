import immu from 'immu'
import types from 'redux/types'
import api from 'services/api'
import ui from './ui/reducer'

const initialState = {
  ui: ui()
}

function actionToTransition(action) {
  switch (action.type) {
    case types.UI_SEARCH_BAR_CHANGED:
    case types.UI_SEARCH_BUTTON_CLICKED:
    case types.UI_SEARCH_BAR_OUTSIDE_CLICKED:
    case types.UI_SEARCH_BAR_SUGGEST_SELECTED:
      return state => ({
        ui: ui(state.ui, action)
      })
    default:
      return undefined
  }
}

export default function search(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return immu({...state, ...transition(state)})
}
