import types from 'redux/types'
import api from 'services/api'

const initialState = {
  me: {}
}

function actionToTransition({ type, error, payload }) {
  switch (type) {
    case types.SAGA_AUTH_RESPONSE:
      if (error) return undefined // todo: handle errors better
      const user = api.getResponseData(payload, 'user') || {}
      return state => ({me: user})
    case types.SAGA_AUTH_LOGOUT:
      return state => ({me: {}})
    case types.SAGA_AUTH_FACEBOOK_RESPONSE:
      return state => ({me: {username: payload.body.name, picture: payload.body.picture}})
    default:
      return undefined
  }
}

export default function session(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return {
    ...state,
    ...transition(state)
  }
}
