import types from 'redux/types'

const initialState = {
  currentLanguage: 'en'
}

const setCurrentLanguage = ({ currentLanguage }) => state => ({currentLanguage})

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.UI_CURRENT_LANGUAGE_SET:
      return setCurrentLanguage(payload)
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
