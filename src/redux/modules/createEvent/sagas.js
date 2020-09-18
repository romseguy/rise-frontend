import { contains } from 'ramda'
import { call, apply, take, put, fork } from 'redux-saga/effects'
import types from 'redux/types'
import api from 'services/api/streams'
import { actions } from 'react-redux-form'

import createAction from 'fsa-creator'
import { ForbiddenFileTypeError } from 'redux/errors'
import makeError from 'make-error-cause'
const CreateEventSagaError = makeError('CreateEventSagaError')
import { formatDate } from 'redux/modules/streams/utils'

// action creators
const thumbnailProcessed = createAction(types.SAGA_CREATE_EVENT_THUMBNAIL_PROCESSED, {
  type: 'object',
  properties: {}
})

function* postEvent() {
  const { payload: { title, description, thumbnail } } = yield take(types.UI_CREATE_EVENT_SUBMITTED)
  const response = yield apply(api, api.postUpcomingStream, [{body: {title, description, thumbnail}}])
  console.log('response', response)
}

function* fileToThumbnail() {
  const { payload: files } = yield take(types.UI_CREATE_EVENT_FILES_DROPPED)
  const file = files[0]
  const allowedTypes = ['image/jpeg', 'image/png']

  if (!contains(file.type, allowedTypes)) {
    yield put(thumbnailProcessed(new ForbiddenFileTypeError()))
  } else {
    yield put(thumbnailProcessed(file))
  }
}

function* locationChanged() {
  while (true) {
    const { payload } = yield take([
      types.UI_CREATE_EVENT_LOCATION_CHANGED,
      types.UI_CREATE_EVENT_SUGGEST_SELECTED
    ])
    yield put(actions.change('createEvent.location', payload.label || payload))
  }
}

function* dateChanged() {
  while (true) {
    const { payload } = yield take(types.UI_CREATE_EVENT_DATE_CHANGED)
    yield put(actions.change('createEvent.date', formatDate(payload)))
  }
}

export default function* createEventSaga() {
  try {
    yield [
      call(postEvent),
      call(fileToThumbnail),
      call(dateChanged),
      call(locationChanged)
    ]
  } catch (cause) {
    let message = ''

    throw new CreateEventSagaError(message, cause)
  }
}
