#!/usr/bin/env node
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
global.__PORT__ = process.env.PORT || 3000
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false

var fs = require('fs')
var path = require('path')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
var config = require('../webpack/webpack-isomorphic-tools.config')

var rootPath = path.resolve(__dirname, '..')

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true, // reload required files only
      ignore: /(\/\.|~$|\.json|\.css$)/i
    })) {
    return
  }
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(config)
  .development(__DEVELOPMENT__)
  .server(rootPath, function () {
    require('babel-register')
    require('../src/server')
  })
