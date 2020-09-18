/* global __CLIENT__:true */
/* global __DEVELOPMENT__:true */
/* global __DEVTOOLS__:true */
import { contains } from 'ramda'
import logger from './logger'
import saga from 'redux-saga'

import mainSaga from 'redux/modules/sagas'
import authSaga from 'redux/modules/auth/sagas'
import createEventSaga from 'redux/modules/createEvent/sagas'
import mapSaga from 'redux/modules/map/sagas'
import newsfeedSaga from 'redux/modules/newsfeed/sagas'
import routingSaga from 'redux/modules/routing/sagas'
import streamsSaga from 'redux/modules/streams/sagas'
import usersSaga from 'redux/modules/users/sagas'

let middlewares = []
let sagas = [mainSaga, newsfeedSaga, routingSaga, streamsSaga, usersSaga]

if (__CLIENT__) {
  sagas = sagas.concat([authSaga, mapSaga, createEventSaga])

  if (__DEVELOPMENT__) {
    if (__DEVTOOLS__) {
      const actionNot = excludedList => (getState, action) => !contains(action.type, excludedList)
      const sagaMonitor = require('./sagaMonitor').default

      middlewares = middlewares.concat([
        sagaMonitor,
        logger({
          logger: console,
          logTransitions: false,
          collapsed: true,
          //predicate: actionNot(['EFFECT_TRIGGERED', 'EFFECT_RESOLVED'])
          predicate: actionNot([])
        })
      ])
    }
  }
}

middlewares = middlewares.concat([
  saga(...sagas)
])

export default middlewares
