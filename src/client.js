/* global __DEVELOPMENT__:true */
/* global __DEVTOOLS__:true */
/* global L:true */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import createStore from './redux/create'
import routes from './routes'
import 'leaflet'
import 'lib/leaflet/leaflet.markercluster'

const { store, history } = createStore(browserHistory, window.__data)
const node = document.getElementsByClassName('global-wrapper')[0]

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  ),
  node
)

if (__DEVELOPMENT__) {
  window.store = store
  window.setLang = (lang) => store.dispatch({
    type: 'ui/UI_CURRENT_LANGUAGE_SET',
    payload: {currentLanguage: lang}
  })

  if (!node || !node.firstChild || !node.firstChild.attributes || !node.firstChild.attributes['data-react-checksum']) {
    console.warn('SSR was discarded')
  }
}

if (__DEVTOOLS__) {
  const DevTools = require('./containers/DevTools').default

  const devToolsNode = document.createElement('div')
  devToolsNode.id = 'mountDevTools'
  document.body.appendChild(devToolsNode)

  ReactDOM.render((
      <Provider store={store}>
        <DevTools />
      </Provider>
    ),
    devToolsNode
  )
}
