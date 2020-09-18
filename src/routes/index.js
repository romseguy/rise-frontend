import React from 'react'
import { Route } from 'react-router'
import checkAuth from 'decorators/checkAuth'

// route components
import App from './App'
import Main from './Main'
import Auth from './Auth'
import CreateEvent from './CreateEvent'
import Stream from './Stream'
import Newsfeed from './Newsfeed'

export default (
  <Route component={App}>
    <Route path='/' component={Main}>
      <Route path='login' component={Auth}/>
      <Route path='register' component={Auth}/>
      <Route path='event' component={checkAuth(CreateEvent)}/>
      <Route path='streams/:hash' component={Stream}/>
      <Route path='newsfeed' component={checkAuth(Newsfeed)}/>
    </Route>
  </Route>
)
