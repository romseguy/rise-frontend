/* global __PORT__:true */
/* global __DEVELOPMENT__:true */
/* global __DISABLE_SSR__:true */
/* global webpackIsomorphicTools:true */
import path from 'path'
import http from 'http'
import Express from 'express'
import compression from 'compression'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import createStoreWithHistory from './redux/create'
import routes from './routes'
import Html from './containers/Html'
import api from './services/api/router'

const app = new Express()
const server = new http.Server(app)
const rootPath = path.resolve(__dirname, '..')

app.use(compression())

app.use(Express.static(path.join(rootPath, 'static')))

app.use('/api/v0', api)

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const memoryHistory = createMemoryHistory(req.url)
  const { store } = createStoreWithHistory()

  if (__DISABLE_SSR__) {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(
        <Html
          assets={webpackIsomorphicTools.assets()}
          store={store}
        />
      ))
  } else {
    match({memoryHistory, routes, location: req.url}, (error, redirectLocation, routingProps) => {
      if (redirectLocation) {
        res.status(301).redirect(redirectLocation.pathname + redirectLocation.search)
      } else if (error) {
        res.status(500).send(error.message)
      } else if (!routingProps) {
        res.status(404).send('Not found')
      } else {
        const component = (
          <Provider store={store}>
            <RouterContext {...routingProps}>
              {routes}
            </RouterContext>
          </Provider>
        )

        res.status(200).send('<!doctype html>\n' +
          ReactDOM.renderToString(
            <Html
              assets={webpackIsomorphicTools.assets()}
              component={component}
              store={store}
            />
          ))
      }
    })
  }
})

server.listen(__PORT__, (err) => {
  if (err) {
    console.error(err)
  }
  console.info('> 💻  Open http://localhost:%s in a browser to view the app.', __PORT__)
})
