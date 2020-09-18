import immu from 'immu'
import types from 'redux/types'
import api from 'services/api'
import ui from './ui/reducer'

const initialState = {
  all: [],
  past: [],
  live: [],
  upcoming: [],
  ui: ui()
}

const setAll = (payload) => {
  const all = api.getResponseData(payload, 'streams') || []
  return state => ({all})
}

const setPast = (payload) => {
  const past = api.getResponseData(payload, 'streams') || []
  return state => ({past})
}

const setLive = (payload) => {
  const live = api.getResponseData(payload, 'streams') || []
  return state => ({live})
}

const setUpcoming = (payload) => {
  const upcoming = api.getResponseData(payload, 'streams') || []
  return state => ({upcoming})
}

function actionToTransition(action) {
  switch (action.type) {
    case types.UI_STREAM_OPENED:
    case types.UI_STREAM_FILTER_PAST_CLICKED:
    case types.UI_STREAM_FILTER_LIVE_CLICKED:
    case types.UI_STREAM_FILTER_UPCOMING_CLICKED:
    case types.SAGA_STREAMS_SUBSCRIBERS_RESPONSE:
      return state => ({
        ui: ui(state.ui, action)
      })
    case types.SAGA_STREAMS_RESPONSE:
      return setAll(action.payload)
    case types.SAGA_STREAMS_PAST_RESPONSE:
      return setPast(action.payload)
    case types.SAGA_STREAMS_LIVE_RESPONSE:
      return setLive(action.payload)
    case types.SAGA_STREAMS_UPCOMING_RESPONSE:
      return setUpcoming(action.payload)
    default:
      return undefined
  }
}

export default function streams(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return immu({...state, ...transition(state)})
}
