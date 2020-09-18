import types from 'redux/types'

const initialState = {
  selectedSuggest: {},
  searching: false,
  searchValue: ''
}

const setSelectedSuggest = selectedSuggest => state => ({selectedSuggest})
const setSearching = searching => state => ({searching: searching || !state.searching})
const setSearchValue = searchValue => state => ({searchValue})

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.UI_SEARCH_BAR_CHANGED:
      return setSearchValue(payload)
    case types.UI_SEARCH_BUTTON_CLICKED:
      return setSearching()
    case types.UI_SEARCH_BAR_OUTSIDE_CLICKED:
      return setSearching(false)
    case types.UI_SEARCH_BAR_SUGGEST_SELECTED:
      return setSelectedSuggest(payload)
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
