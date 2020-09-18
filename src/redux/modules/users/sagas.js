import { call, apply, take, put, select } from 'redux-saga/effects'
import types from 'redux/types'
import createAction from 'fsa-creator'

import api from 'services/api'
import users from 'services/api/users'
import usersSchemas from 'services/api/users/schemas'

import {meSelector} from 'redux/modules/auth'

import makeError from 'make-error-cause'
const UsersSagaError = makeError('UsersSagaError')

// action creators
const followingResponse = createAction(types.SAGA_USERS_FOLLOWING_RESPONSE, {
  type: 'object',
  required: ['username', 'following'],
  properties: {
    username: {
      type: 'string'
    },
    following: usersSchemas['/following']
  }
})

const followUserResponse = createAction(types.SAGA_USERS_FOLLOW_USER_RESPONSE, {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    usernameFollowed: {
      type: 'string'
    }
  }
})

const unfollowUserResponse = createAction(types.SAGA_USERS_UNFOLLOW_USER_RESPONSE, {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    usernameUnfollowed: {
      type: 'string'
    }
  }
})

function* getFollowing() {
  while (true) {
    const { payload } = yield take(types.SAGA_AUTH_RESPONSE)

    if (payload.body.code === 0) { // todo: magic number
      const { username } = api.getResponseData(payload, 'user') || {}
      const { body } = yield apply(users, users.getFollowing, [username])

      yield put(followingResponse({
        username,
        following: body
      }))
    }
  }
}

function* followUser() {
  while (true) {
    const { payload: { username: usernameToFollow } } = yield take(types.UI_USER_FOLLOWED)
    const { body } = yield apply(users, users.followUser, [usernameToFollow])
    // todo: test body.code
    const { username } = yield select(meSelector)

    yield put(followUserResponse({
      username,
      usernameFollowed: usernameToFollow
    }))
  }
}

function* unfollowUser() {
  while (true) {
    const { payload: { username: usernameToUnfollow } } = yield take(types.UI_USER_UNFOLLOWED)
    const { body } = yield apply(users, users.unfollowUser, [usernameToUnfollow])
    // todo: test body.code
    const { username } = yield select(meSelector)

    yield put(unfollowUserResponse({
      username,
      usernameUnfollowed: usernameToUnfollow
    }))
  }
}

export default function* usersSaga() {
  try {
    yield [
      call(getFollowing),
      call(followUser),
      call(unfollowUser)
    ]
  } catch (cause) {
    let message = ''

    throw new UsersSagaError(message, cause)
  }
}
