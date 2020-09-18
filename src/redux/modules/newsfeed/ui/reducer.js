import types from 'redux/types'

const initialState = {
  visible: false,
  loading: false,
  newsfeedFilter: {
    type: 'all'
  }
}

const setVisible = (visible) => state => ({visible})
const setLoading = (loading) => state => ({loading})

const setNewsfeedFilter = ({ type }) => state => {
  const prevType = state.newsfeedFilter.type
  let nextType = 'all'

  if (prevType !== type) {
    nextType = type
  }

  return {
    newsfeedFilter: {type: nextType}
  }
}

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.UI_NEWSFEED_OPENED:
      return setVisible(true)
    case types.UI_NEWSFEED_OUTSIDE_CLICKED:
      return setVisible(false)
    case types.UI_NEWSFEED_BUTTON_CLICKED:
      return state => ({
        //...setVisible(!state.visible)(state),
        ...setLoading(true)(state)
      })
    case types.UI_NEWSFEED_FILTER_PAST_CLICKED:
      return state => ({
        ...setNewsfeedFilter({type: 'past'})(state),
        ...setLoading(true)(state)
      })
    case types.UI_NEWSFEED_FILTER_LIVE_CLICKED:
      return state => ({
        ...setNewsfeedFilter({type: 'live'})(state),
        ...setLoading(true)(state)
      })
    case types.UI_NEWSFEED_FILTER_UPCOMING_CLICKED:
      return state => ({
        ...setNewsfeedFilter({type: 'upcoming'})(state),
        ...setLoading(true)(state)
      })
    case types.SAGA_NEWSFEED_PAST_RESPONSE:
    case types.SAGA_NEWSFEED_LIVE_RESPONSE:
    case types.SAGA_NEWSFEED_UPCOMING_RESPONSE:
    case types.SAGA_NEWSFEED_RESPONSE:
      return setLoading(false)
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
