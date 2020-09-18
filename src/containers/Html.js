/* global __DEVELOPMENT__:true */
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'

class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  };

  render() {
    const { assets, component, store } = this.props
    const content = component ? ReactDOM.renderToString(component) : ''

    return (
      <html className='js svg supports video audio no-touchevents csstransforms csstransforms3d csstransitions'>
      <head>
        <meta charSet='utf-8'/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href='/css/app.css' rel='stylesheet' type='text/css'/>
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'/>

        {!__DEVELOPMENT__ && <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.js"></script>}
        {!__DEVELOPMENT__ && <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.js"></script>}
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjwlPOWot3ZBx7H_XLG1tPC2HkZh0Sn4E&libraries=places"></script>
        <script src="//connect.facebook.net/en_US/all.js"></script>

        {/* from https://www.wowza.com/resources/3.6.0/examples/LiveDVRStreaming/FlashHTTPPlayer/player.html */}
        <script type="text/javascript">AC_FL_RunContent = 0</script>
        <script type="text/javascript" src="/js/AC_RunActiveContent.js"></script>
        <script type="text/javascript" src="/js/swfobject.js"></script>
        <script type="text/javascript" src="/js/ParsedQueryString.js"></script>

        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) =>
          <link
            key={key}
            href={assets.styles[style]}
            media='screen, projection'
            rel='stylesheet'
            type='text/css'
          />
        )}
      </head>
      <body>
        <div className='global-wrapper' dangerouslySetInnerHTML={{__html: content}}/>
        <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}/>
        <script src={assets.javascript.main}/>
      </body>
      </html>
    )
  }
}

export default Html
