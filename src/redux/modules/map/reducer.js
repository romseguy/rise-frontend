import types from 'redux/types'
import ui from './ui/reducer'

const initialState = {
  ui: ui()
}

function actionToTransition(action) {
  switch (action.type) {
    case types.UI_MAP_LOADED:
    case types.SAGA_MAP_MARKERS_SET:
      return state => ({
        ui: ui(state.ui, action)
      })
    default:
      return undefined
  }
}

export default function map(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  // cannot be immutable because ui state is mutated by Leaflet
  return {...state, ...transition(state)}
}
