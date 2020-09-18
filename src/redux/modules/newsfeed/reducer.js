import immu from 'immu'
import types from 'redux/types'
import ui from './ui/reducer'
import api from 'services/api'

const initialState = {
  streams: [],
  ui: ui()
}

const setStreams = payload => state => ({streams: api.getResponseData(payload, 'streams') || []})

function actionToTransition(action) {
  switch (action.type) {
    case types.UI_NEWSFEED_BUTTON_CLICKED:
    case types.UI_NEWSFEED_OPENED:
    case types.UI_NEWSFEED_OUTSIDE_CLICKED:
    case types.UI_NEWSFEED_FILTER_PAST_CLICKED:
    case types.UI_NEWSFEED_FILTER_LIVE_CLICKED:
    case types.UI_NEWSFEED_FILTER_UPCOMING_CLICKED:
      return state => ({
        ui: ui(state.ui, action)
      })
    case types.SAGA_NEWSFEED_RESPONSE:
    case types.SAGA_NEWSFEED_PAST_RESPONSE:
    case types.SAGA_NEWSFEED_LIVE_RESPONSE:
    case types.SAGA_NEWSFEED_UPCOMING_RESPONSE:
      return state => ({
        ...setStreams(action.payload)(state),
        ui: ui(state.ui, action)
      })
    default:
      return undefined
  }
}

export default function newsfeed(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return immu({...state, ...transition(state)})
}
