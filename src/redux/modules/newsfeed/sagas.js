import { call, apply, take, put, select } from 'redux-saga/effects'
import types from 'redux/types'
import createAction from 'fsa-creator'

import newsfeed from 'services/api/newsfeed'
import newsfeedSchemas from 'services/api/newsfeed/schemas'
import { visibleSelector, filterTypeSelector } from 'redux/modules/newsfeed'
import { NewsfeedSagaError, createSagaError } from 'redux/errors'

// action creators
const newsfeedResponse = createAction(types.SAGA_NEWSFEED_RESPONSE, newsfeedSchemas['/'])
const newsfeedPastResponse = createAction(types.SAGA_NEWSFEED_PAST_RESPONSE, newsfeedSchemas['/'])
const newsfeedLiveResponse = createAction(types.SAGA_NEWSFEED_LIVE_RESPONSE, newsfeedSchemas['/'])
const newsfeedUpcomingResponse = createAction(types.SAGA_NEWSFEED_UPCOMING_RESPONSE, newsfeedSchemas['/'])

function* fetchNewsfeed() {
  try {
    const { body } = yield apply(newsfeed, newsfeed.getNewsfeed, [{mocked: true}])
    yield put(newsfeedResponse(body))
  } catch (cause) {
    yield put(createSagaError(NewsfeedSagaError, 'An error occured while fetching streams from the newsfeed', cause))
  }
}

function* fetchPastNewsfeed() {
  try {
    const { body } = yield apply(newsfeed, newsfeed.getPastNewsfeed, [{mocked: true}])
    yield put(newsfeedPastResponse(body))
  } catch (cause) {
    yield put(createSagaError(NewsfeedSagaError, 'An error occured while fetching past streams from the newsfeed', cause))
  }
}

function* fetchLiveNewsfeed() {
  try {
    const { body } = yield apply(newsfeed, newsfeed.getLiveNewsfeed, [{mocked: true}])
    yield put(newsfeedLiveResponse(body))
  } catch (cause) {
    yield put(createSagaError(NewsfeedSagaError, 'An error occured while fetching live streams from the newsfeed', cause))
  }
}

function* fetchUpcomingNewsfeed() {
  try {
    const { body } = yield apply(newsfeed, newsfeed.getUpcomingNewsfeed, [{mocked: true}])
    yield put(newsfeedUpcomingResponse(body))
  } catch (cause) {
    yield put(createSagaError(NewsfeedSagaError, 'An error occured while fetching upcoming streams from the newsfeed', cause))
  }
}

function* fetchSelector() {
  while (true) {
    yield take([
      types.UI_NEWSFEED_OPENED,
      types.UI_NEWSFEED_FILTER_PAST_CLICKED,
      types.UI_NEWSFEED_FILTER_LIVE_CLICKED,
      types.UI_NEWSFEED_FILTER_UPCOMING_CLICKED
    ])
    /*    const isVisible = yield select(visibleSelector)

     if (!isVisible) continue*/

    const type = yield select(filterTypeSelector)

    switch (type) {
      case 'all':
        yield call(fetchNewsfeed)
        break
      case 'past':
        yield call(fetchPastNewsfeed)
        break
      case 'live':
        yield call(fetchLiveNewsfeed)
        break
      case 'upcoming':
        yield call(fetchUpcomingNewsfeed)
        break
      default:
        console.error('unknown newsfeed filter type')
      // todo: throw error
    }
  }
}

export default function* newsfeedSaga() {
  yield [
    call(fetchSelector)
  ]
}
