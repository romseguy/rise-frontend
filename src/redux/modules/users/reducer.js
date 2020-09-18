import immu from 'immu'
import { omit, reduce } from 'ramda'
import types from 'redux/types'
import api from 'services/api'

const initialState = {
  /*
    [username]: {
      following: {
        [username]: {
          // user data
        }
      }
    }
   */
}

const setUserFollowing = ({ username, following }) => {
  const followedUsers = reduce(
    (acc, followedUser) => {
      acc[followedUser.username] = omit('username', followedUser)
      return acc
    },
    {},
    api.getResponseData(following, 'following') || {}
  )

  return users => {
    const user = users[username] || {following: {}}

    return {
      [username]: {
        ...user,
        following: {
          ...user.following,
          ...followedUsers
        }
      }
    }
  }
}

const addFollower = ({ username, usernameFollowed }) => users => {
  const user = users[username]

  if (!user) {
    return users
  }

  return {
    [username]: {
      ...user,
      following: {
        ...user.following,
        [usernameFollowed]: {}
      }
    }
  }
}

const removeFollower = ({ username, usernameUnfollowed }) => users => {
  const user = users[username]

  if (!user) {
    return users
  }

  return {
    [username]: {
      ...user,
      following: omit(usernameUnfollowed, user.following)
    }
  }
}

function actionToTransition(action) {
  switch (action.type) {
    case types.SAGA_USERS_FOLLOWING_RESPONSE:
      return setUserFollowing(action.payload)
    case types.SAGA_USERS_FOLLOW_USER_RESPONSE:
      return addFollower(action.payload)
    case types.SAGA_USERS_UNFOLLOW_USER_RESPONSE:
      return removeFollower(action.payload)
    default:
      return undefined
  }
}

export default function reducer(users = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return users
  }

  return immu({
    ...users,
    ...transition(users)
  })
}
