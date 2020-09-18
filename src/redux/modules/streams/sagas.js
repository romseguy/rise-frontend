import { isEmpty, uniqBy, compose, filter, contains } from 'ramda'
import { call, apply, take, put, select } from 'redux-saga/effects'
import types from 'redux/types'
import createAction from 'fsa-creator'

import streams from 'services/api/streams'
import streamsSchemas from 'services/api/streams/schemas'
import { streamFilterTypeSelector } from 'redux/modules/streams'

import { StreamsSagaError, createSagaError } from 'redux/errors'

// action creators
const streamsResponse = createAction(types.SAGA_STREAMS_RESPONSE, streamsSchemas['/'])
const streamsPastResponse = createAction(types.SAGA_STREAMS_PAST_RESPONSE, streamsSchemas['/'])
const streamsLiveResponse = createAction(types.SAGA_STREAMS_LIVE_RESPONSE, streamsSchemas['/'])
const streamsUpcomingResponse = createAction(types.SAGA_STREAMS_UPCOMING_RESPONSE, streamsSchemas['/'])
const streamsSubscribersReponse = createAction(types.SAGA_STREAMS_SUBSCRIBERS_RESPONSE, streamsSchemas['/subscribers'])
const subscribeResponse = createAction(types.SAGA_STREAMS_SUBSCRIBE_RESPONSE, {
  type: 'object',
  required: ['hash'],
  properties: {
    hash: {type: 'string'}
  }
})
const unsubscribeResponse = createAction(types.SAGA_STREAMS_UNSUBSCRIBE_RESPONSE, {
  type: 'object',
  required: ['hash'],
  properties: {
    hash: {type: 'string'}
  }
})

const processStreams = compose(
  uniqBy(({latitude, longitude}) => ({latitude, longitude})),
  filter(({ title, latitude, longitude }) => title !== '' && latitude !== null && longitude !== null)
)

function* fetchStreams() {
  try {
    let { body } = yield apply(streams, streams.getStreams, [{mocked: false, skipAuth: true}])
    body.data.streams = processStreams(body.data.streams)
    yield put(streamsResponse(body))
  } catch (cause) {
    yield put(createSagaError(StreamsSagaError, 'An error occured while fetching streams', cause))
  }
}

function* fetchPastStreams() {
  try {
    let { body } = yield apply(streams, streams.getPastStreams, [{mocked: false, skipAuth: true}])
    body.data.streams = processStreams(body.data.streams)
    yield put(streamsPastResponse(body))
  } catch (cause) {
    yield put(createSagaError(StreamsSagaError, 'An error occured while fetching past streams', cause))
  }
}

function* fetchLiveStreams() {
  try {
    let { body } = yield apply(streams, streams.getLiveStreams, [{mocked: false, skipAuth: true}])
    body.data.streams = processStreams(body.data.streams)
    yield put(streamsLiveResponse(body))
  } catch (cause) {
    yield put(createSagaError(StreamsSagaError, 'An error occured while fetching live streams', cause))
  }
}

function* fetchUpcomingStreams() {
  try {
    let { body } = yield apply(streams, streams.getUpcomingStreams, [{mocked: false, skipAuth: true}])
    body.data.streams = processStreams(body.data.streams)
    yield put(streamsUpcomingResponse(body))
  } catch (cause) {
    yield put(createSagaError(StreamsSagaError, 'An error occured while fetching upcoming streams', cause))
  }
}

function* fetchSelector() {
  while (true) {
    yield take([
      types.SAGA_STREAMS_REQUEST,
      types.UI_STREAM_FILTER_PAST_CLICKED,
      types.UI_STREAM_FILTER_LIVE_CLICKED,
      types.UI_STREAM_FILTER_UPCOMING_CLICKED
    ])

    const type = yield select(streamFilterTypeSelector)

    switch (type) {
      case 'all':
        yield call(fetchStreams)
        break
      case 'past':
        yield call(fetchPastStreams)
        break
      case 'live':
        yield call(fetchLiveStreams)
        break
      case 'upcoming':
        yield call(fetchUpcomingStreams)
        break
      default:
      // todo: throw error
    }
  }
}

function* subscribe() {
  while (true) {
    try {
      const { payload: { hash } } = yield take(types.UI_STREAM_SUBSCRIBED)
      yield apply(streams, streams.subscribe, [hash])
      yield put(subscribeResponse({hash}))
    } catch (cause) {
      yield put(createSagaError(StreamsSagaError, 'An error occured while subscribing to the stream', cause))
    }
  }
}

function* unsubscribe() {
  while (true) {
    try {
      const { payload: { hash } } = yield take(types.UI_STREAM_UNSUBSCRIBED)
      yield apply(streams, streams.unsubscribe, [hash])
      yield put(unsubscribeResponse({hash}))
    } catch (cause) {
      yield put(createSagaError(StreamsSagaError, 'An error occured while unsubscribing from the stream', cause))
    }
  }
}

function* getSubscribers() {
  let hash
  let isLoggedIn

  while (true) {
    try {
      const { type, payload } = yield take([
        types.UI_STREAM_OPENED,
        types.SAGA_AUTH_RESPONSE,
        types.SAGA_STREAMS_SUBSCRIBE_RESPONSE,
        types.SAGA_STREAMS_UNSUBSCRIBE_RESPONSE
      ])

      if (contains(type, [types.UI_STREAM_OPENED, types.SAGA_STREAMS_SUBSCRIBE_RESPONSE, types.SAGA_STREAMS_UNSUBSCRIBE_RESPONSE])) {
        hash = payload.hash
      } else {
        isLoggedIn = payload.body.code === 0
      }

      if (isLoggedIn && hash) {
        const { body } = yield apply(streams, streams.getSubscribers, [hash])
        yield put(streamsSubscribersReponse(body))
      }
    } catch (cause) {
      yield put(createSagaError(StreamsSagaError, 'An error occured while retrieving stream subscribers', cause))
    }
  }
}

export default function* streamsSaga() {
  yield [
    call(fetchSelector),
    call(subscribe),
    call(unsubscribe),
    call(getSubscribers)
  ]
}
