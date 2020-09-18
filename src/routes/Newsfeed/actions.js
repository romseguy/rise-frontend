import createAction from 'fsa-creator'
import types from 'redux/types'

export const onOpen = createAction(types.UI_NEWSFEED_OPENED)
export const onOutsideClick = createAction(types.UI_NEWSFEED_OUTSIDE_CLICKED)
export const onRowTitleClick = createAction(types.UI_NEWSFEED_ROW_TITLE_CLICKED, {
  type: 'object',
  required: ['hash'],
  properties: {
    hash: {type: 'string'}
  }
})
