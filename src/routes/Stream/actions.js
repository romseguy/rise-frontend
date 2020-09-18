import createAction from 'fsa-creator'
import types from 'redux/types'

export const onOpen = createAction(types.UI_STREAM_OPENED, {
  type: 'object',
  required: ['hash'],
  properties: {
    hash: {
      type: 'string'
    }
  }
})

export const onClose = createAction(types.UI_STREAM_CLOSED)

export const onFollow = createAction(types.UI_USER_FOLLOWED, {
  type: 'object',
  required: ['username'],
  properties: {
    username: {
      type: 'string'
    }
  }
})
export const onUnfollow = createAction(types.UI_USER_UNFOLLOWED, {
  type: 'object',
  required: ['username'],
  properties: {
    username: {
      type: 'string'
    }
  }
})

export const onSubscribe = createAction(types.UI_STREAM_SUBSCRIBED, {
  type: 'object',
  required: ['hash'],
  properties: {
    hash: {
      type: 'string'
    }
  }
})

export const onUnsubscribe = createAction(types.UI_STREAM_UNSUBSCRIBED, {
  type: 'object',
  required: ['hash'],
  properties: {
    hash: {
      type: 'string'
    }
  }
})
