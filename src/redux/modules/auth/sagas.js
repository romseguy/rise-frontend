import { take, put, call, apply, fork } from 'redux-saga/effects'
import createAction from 'fsa-creator'
import types from 'redux/types'
import { salt } from 'services/api/config'
import encodePassword from 'services/api/utils/encodePassword'

import api from 'services/api/auth'
import authSchemas from 'services/api/auth/schemas'

import registerApi from 'services/api/register'
import fbApi from 'services/fb'
import { AuthSagaError, OneTimeUserError, createSagaError } from 'redux/errors'

// action creators
const authResponse = createAction(types.SAGA_AUTH_RESPONSE, {
  type: 'object',
  required: ['body', 'fromUI'],
  properties: {
    body: authSchemas['/'],
    fromUI: {type: 'boolean'}
  }
})

const fbAuthResponse = createAction(types.SAGA_AUTH_FACEBOOK_RESPONSE, {
  type: 'object',
  required: ['body', 'fromUI'],
  properties: {
    body: {
      id: {type: 'string'},
      name: {type: 'string'}
    },
    authResponse: {
      type: ['object']
    },
    fromUI: {type: 'boolean'}
  }
})

function* logout() {
  while (true) {
    try {
      yield take(types.UI_AUTH_USERMENU_LOGOUT_CLICKED)

      yield call(api.removeStoredCreds)
      const response = yield apply(api, api.getLoginStatus)

      if (response.status === 'connected') {
        yield apply(api, api.fbLogout)
      }

      yield put({type: types.SAGA_AUTH_LOGOUT})
    } catch (cause) {
      yield put(createSagaError(AuthSagaError, 'An error occured during logout', cause))
    }
  }
}

function* riseAuth() {
  while (true) {
    try {
      const { type, error, payload } = yield take([
        types.UI_LOGIN_FORM_SUBMITTED,
        types.SAGA_REGISTER_RESPONSE
      ])

      let creds

      if (type === types.SAGA_REGISTER_RESPONSE) {
        const user = api.getResponseData(payload, 'user') || {}
        creds = {
          username: user.email,
          password: encodePassword(payload.encodedPassword, salt) // fixme
        }
      } else {
        creds = {
          username: payload.user.email,
          password: encodePassword(encodePassword(payload.user.password, salt), salt) // fixme
        }
      }

      const { body } = yield apply(api, api.login, [{creds}])

      if (body.status === 'error') {
        yield put(createSagaError(OneTimeUserError, {code: body.code, cause: '/login'}))
      } else {
        yield call(api.setStoredCreds, creds)
        yield put(authResponse({body, fromUI: true}))
      }
    } catch (cause) {
      yield put(createSagaError(AuthSagaError, 'An error occured during Rise authentication', cause))
    }
  }
}

function* fbAuth() {
  while (true) {
    try {
      yield take(types.UI_AUTH_FACEBOOK_CLICKED)
      const response = yield apply(api, api.fbLogin)
      const { userID, accessToken } = response.authResponse

      if (response.status === 'connected') {
        const { first_name, last_name, gender, email, picture: { data: { url: picture }}} = yield apply(fbApi, fbApi.getFields, [userID, ['first_name', 'last_name', 'gender', 'picture', 'email']])
        const body = {
          facebook_id: userID,
          facebook_token: accessToken,
          firstname: first_name,
          lastname: last_name,
          gender,
          email,
          picture
        }

        if (!email) {
          body.email = window.prompt('We were unable to retrieve your email address from Facebook, please enter your email in the text box below.')
        }

        const res = yield apply(registerApi, registerApi.fbRegister, [{skipAuth: true, body}])
        console.log('??????,', res)
        //yield put(fbAuthResponse({body: me, fromUI: true}))
      }
    } catch (cause) {
      yield put(createSagaError(AuthSagaError, 'An error occured during Facebook authentication', cause))
    }
  }
}

function* browserFbAuth() {
  try {
    const { status, authResponse: fbtoken } = yield apply(api, api.getLoginStatus)

    if (status === 'connected') {
      const { userID } = fbtoken
      const { name, first_name, last_name, gender, email, picture: { data: { url: picture }}} = yield apply(fbApi, fbApi.getFields, [userID, ['name', 'first_name', 'last_name', 'gender', 'picture', 'email']])
      const me = {}//yield apply(fbApi, fbApi.me)
      yield put(fbAuthResponse({
        body: {...me, name, picture},
        authResponse: fbtoken,
        fromUI: false
      }))
    }
  } catch (cause) {
    yield put(createSagaError(AuthSagaError, 'An error occured during Facebook cookie authentication', cause))
  }
}

function* browserAuth() {
  try {
    const creds = yield call(api.getStoredCreds)

    if (creds) {
      const { body } = yield apply(api, api.login, [{creds}])
      yield call(api.setStoredCreds, creds)
      yield put(authResponse({body, fromUI: false}))

      if (body.code === 2) { // todo: magic number
        yield call(api.removeStoredCreds)
        return false
      }

      return true
    }
  } catch (cause) {
    yield put(createSagaError(AuthSagaError, 'An error occured during Rise cookie authentication', cause))
  }
}

function* main() {
  let loggedIn = yield call(browserAuth)

  if (loggedIn) {
    console.log('logged in from Rise cookie')
    return
  }

  loggedIn = yield call(browserFbAuth)

  if (loggedIn) {
    console.log('logged in from FB cookie')
  }

}

function* setFbToken() {
  while (true) {
    const { payload: { authResponse: token } } = yield take(types.SAGA_AUTH_FACEBOOK_RESPONSE)
    yield apply(api, api.setFbToken, [token])
  }
}

export default function* authSaga() {
  yield [
    call(main),
    call(riseAuth),
    call(fbAuth),
    call(logout),
    call(setFbToken)
  ]
}
