import immu from 'immu'
import { actionTypes, createFormReducer } from 'react-redux-form'
import types from 'redux/types'
import ui from './ui/reducer'
import model from './model/reducer'

const initialState = {
  ui: ui(),
  model: model()
}

function actionToTransition(action) {
  switch (action.type) {
    case actionTypes.CHANGE:
      return state => ({
        model: model(state.model, action)
      })
    case types.SAGA_CREATE_EVENT_THUMBNAIL_PROCESSED:
      return state => ({
        ui: ui(state.ui, action)
      })
    default:
      return undefined
  }
}

export default function createEvent(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return immu({...state, ...transition(state)})
}
