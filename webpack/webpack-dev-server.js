var Express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./dev.config')

var host = process.env.HOST || 'localhost'
var port = process.env.PORT || 3001

var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
}

var app = new Express()
var compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err)
  } else {
    console.info('> 🚧  Webpack development server listening on port %s', port)
  }
})
