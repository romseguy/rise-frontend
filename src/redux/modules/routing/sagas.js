import { isEmpty } from 'ramda'
import { goBack, push } from 'react-router-redux'
import { take, put, call, select } from 'redux-saga/effects'
import types from 'redux/types'
import {meSelector} from 'redux/modules/auth'

import makeError from 'make-error-cause'
const RoutingSagaError = makeError('RoutingSagaError')

function* goToPrevious() {
/*  while (true) {
    yield take([
    ])
    yield put(goBack())
  }*/
}

function* goToRoot() {
  while (true) {
    const { type, payload } = yield take([
      types.SAGA_AUTH_RESPONSE,
      types.SAGA_AUTH_FACEBOOK_RESPONSE,
      types.UI_AUTH_OUTSIDE_CLICKED,
      types.UI_CREATE_EVENT_CLOSED,
      types.UI_CREATE_EVENT_OUTSIDE_CLICKED,
      types.UI_NEWSFEED_OUTSIDE_CLICKED,
      types.UI_STREAM_CLOSED,
    ])

    if (type === types.SAGA_AUTH_RESPONSE && (!payload.fromUI || payload.body.code !== 0)
    || type === types.SAGA_AUTH_FACEBOOK_RESPONSE && !payload.fromUI) {
      continue
    }

    yield put(push('/'))
  }
}

function* goToLogin() {
  while (true) {
    const { type } = yield take([types.UI_HEADER_SIGNIN_BUTTON_CLICKED, types.UI_MAIN_CREATE_EVENT_BUTTON_CLICKED])
    const me = yield select(meSelector)
    const isLoggedIn = !isEmpty(me)

    if (!isLoggedIn) {
      if (type === types.UI_MAIN_CREATE_EVENT_BUTTON_CLICKED) {
        yield put(push('/login?next=/event'))
      } else {
        yield put(push('/login'))
      }
    }
  }
}

function* goToEvent() {
  while (true) {
    yield take(types.UI_MAIN_CREATE_EVENT_BUTTON_CLICKED)
    const me = yield select(meSelector)
    const isLoggedIn = !isEmpty(me)

    if (isLoggedIn) {
      yield put(push('/event'))
    }
  }
}

function* goToStream() {
  while (true) {
    const { payload: stream } = yield take([types.UI_MAP_MARKER_POPUP_TITLE_CLICKED, types.UI_NEWSFEED_ROW_TITLE_CLICKED])
    yield put(push(`/streams/${stream.hash}`))
  }
}

function* goToNewsfeed() {
  while (true) {
    yield take(types.UI_NEWSFEED_BUTTON_CLICKED)
    yield put(push(`/newsfeed`))
  }
}

export default function* routingSaga() {
  try {
    yield [
      call(goToPrevious),
      call(goToRoot),
      call(goToLogin),
      call(goToEvent),
      call(goToStream),
      call(goToNewsfeed)
    ]
  } catch (cause) {
    let message = ''

    throw new RoutingSagaError(message, cause)
  }
}
