import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth/reducer'
import createEvent from './createEvent/reducer'
import i18n from './i18n/reducer'
import map from './map/reducer'
import newsfeed from './newsfeed/reducer'
import search from './search/reducer'
import streams from './streams/reducer'
import users from './users/reducer'
import errorLog from './errorLog/reducer'

export default combineReducers({
  routing: routerReducer,
  i18n,
  errorLog,
  map,
  auth,
  search,
  streams,
  newsfeed,
  users,
  createEvent
})
