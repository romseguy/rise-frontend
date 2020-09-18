import createAction from 'fsa-creator'
import types from 'redux/types'

export const CreateEventButtonActions = {
  onClick: createAction(types.UI_MAIN_CREATE_EVENT_BUTTON_CLICKED)
}

export const MapActions = {
  onLoad: createAction(types.UI_MAP_LOADED, {type: 'object'})
}
