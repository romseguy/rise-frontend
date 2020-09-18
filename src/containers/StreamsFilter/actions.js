import types from 'redux/types'
import createAction from 'fsa-creator'

export const onPastClick = createAction(types.UI_STREAM_FILTER_PAST_CLICKED)
export const onLiveClick = createAction(types.UI_STREAM_FILTER_LIVE_CLICKED)
export const onUpcomingClick = createAction(types.UI_STREAM_FILTER_UPCOMING_CLICKED)
