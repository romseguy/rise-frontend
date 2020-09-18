/* global __CLIENT__:true */
/* global __DEVELOPMENT__:true */
/* global __DEVTOOLS__:true */
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { identity } from 'ramda'
import immu from 'immu'
import middlewares from './middlewares'
import reducer from './modules/reducer'

function getPersistSession() {
  if (__DEVELOPMENT__) {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    return (matches && matches.length > 0) ? matches[1] : null
  }
}

export default function createStoreWithHistory(history, initialState) {
  let enhancer = identity

  if (__CLIENT__) {
    if (__DEVELOPMENT__) {
      if (__DEVTOOLS__) {
        const persistState = require('redux-devtools').persistState
        const DevTools = require('../containers/DevTools').default
        enhancer = compose(
          DevTools.instrument(),
          persistState(getPersistSession())
        )
      }
    }
  }

  const store = createStore(reducer, immu(initialState), compose(
    history ?
      applyMiddleware(...middlewares, routerMiddleware(history)) :
      applyMiddleware(...middlewares),
    enhancer
  ))

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer').default)
    })
  }

  return {store, history: history ? syncHistoryWithStore(history, store) : null}
}
