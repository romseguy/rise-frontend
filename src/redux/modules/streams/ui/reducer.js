import types from 'redux/types'
import api from 'services/api'

const initialState = {
  currentStream: {
    hash: '',
    subscribers: []
  },
  streamFilter: {
    type: 'all'
  }
}

const setCurrentStream = ({ hash }) => state => ({
  currentStream: {...state.currentStream, hash}
})

const setStreamFilter = ({ type }) => state => {
  const prevType = state.streamFilter.type
  let nextType = 'all'

  if (prevType !== type) {
    nextType = type
  }

  return {
    streamFilter: {type: nextType}
  }
}

const setCurrentStreamSubscribers = (payload) => {
  const subscribers = api.getResponseData(payload, 'subscribers') || []
  return state => ({
    currentStream: {...state.currentStream, subscribers}
  })
}

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.UI_STREAM_OPENED:
      return setCurrentStream(payload)
    case types.UI_STREAM_FILTER_PAST_CLICKED:
      return setStreamFilter({type: 'past'})
    case types.UI_STREAM_FILTER_LIVE_CLICKED:
      return setStreamFilter({type: 'live'})
    case types.UI_STREAM_FILTER_UPCOMING_CLICKED:
      return setStreamFilter({type: 'upcoming'})
    case types.SAGA_STREAMS_SUBSCRIBERS_RESPONSE:
      return setCurrentStreamSubscribers(payload)
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
