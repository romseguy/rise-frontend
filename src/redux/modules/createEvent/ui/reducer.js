import types from 'redux/types'

const initialState = {
  thumbnail: {}
}

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.SAGA_CREATE_EVENT_THUMBNAIL_PROCESSED:
      return () => ({thumbnail: payload})
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
