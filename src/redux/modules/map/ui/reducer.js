import types from 'redux/types'

const initialState = {
  map: {},
  markerStreamMap: {},
  markersLayer: {}
}

const setMap = (payload) => state => ({map: payload})
const setMarkers = ({ markerStreamMap, markersLayer }) => state => ({
  markerStreamMap: Object.assign({}, state.markerStreamMap, markerStreamMap),
  markersLayer
})

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.UI_MAP_LOADED:
      return setMap(payload)
    case types.SAGA_MAP_MARKERS_SET:
      return setMarkers(payload)
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
