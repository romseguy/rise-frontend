import { call, apply, take, put, fork } from 'redux-saga/effects'
import types from 'redux/types'
import { salt } from 'services/api/config'
import createAction from 'fsa-creator'
import api from 'services/api'
import registerApi from 'services/api/register'
import schemas from 'services/api/schemas'
import encodePassword from 'services/api/utils/encodePassword'

import { MainSagaError, OneTimeUserError, createSagaError } from 'redux/errors'

const registerResponse = createAction(types.SAGA_REGISTER_RESPONSE, {
  type: 'object',
  required: ['body', 'encodedPassword'],
  properties: {
    body: schemas['/register'],
    encodedPassword: {type: 'string'}
  }
})

function* startup() {
  if (__CLIENT__) {
    if (window.FB !== undefined) {
      FB.init({
        appId: '948400158548917', // App ID
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true,  // parse XFBML
        version: 'v2.5' // use graph api version 2.5
      })
    }
  }

  yield put({type: types.SAGA_STREAMS_REQUEST})
}

function* signup() {
  while (true) {
    try {
      const { payload } = yield take(types.UI_SIGNUP_FORM_SUBMITTED)
      const encodedPassword = encodePassword(payload.password, salt)
      const { body } = yield apply(registerApi, registerApi.register, [{
        body: {
          email: payload.email,
          password: encodedPassword
        },
        skipAuth: true
      }])

      if (body.status === 'error') {
        yield put(createSagaError(OneTimeUserError, {code: body.code, cause: '/register'}))
      } else {
        yield put(registerResponse({body, encodedPassword}))
      }
    } catch (cause) {
      yield put(createSagaError(MainSagaError, 'An error occured during signup', cause))
    }
  }
}

export default function* mainSaga() {
  yield [
    fork(startup),
    call(signup)
  ]
}
