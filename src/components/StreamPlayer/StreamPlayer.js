import './StreamPlayer.scss'

import { isEmpty } from 'ramda'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'

/*
 todo
 class DashPlayer extends Component {

 state = {
 player: null
 };

 componentDidMount() {
 const dash = require('dashjs')
 const player = dash.MediaPlayer().create();
 player.initialize(this.refs.video, url, true)
 }

 render() {
 <div>
 <video ref='video'></video>
 </div>
 }
 }
 */

class FlashPlayer extends Component {

  componentDidMount() {
    if (__CLIENT__) {
      /* from https://www.wowza.com/resources/3.6.0/examples/LiveDVRStreaming/FlashHTTPPlayer/player.html */
      const pqs = new ParsedQueryString()
      const parameterNames = pqs.params(false)
      const parameters = {
        src: `http://dev.risenews.tv:1935/rise/${this.props.stream.hash}/manifest.f4m?DVR`,
        autoPlay: 'false',
        verbose: true,
        controlBarAutoHide: 'false',
        controlBarPosition: 'bottom'
      }

      for (let i = 0; i < parameterNames.length; i++) {
        const parameterName = parameterNames[i]
        parameters[parameterName] = pqs.param(parameterName) || parameters[parameterName]
      }

      // Escape the ampersands so any URL params pass through OSMF into Wowza
      parameters.src = escape(parameters.src);

      let wmodeValue = 'direct'
      const wmodeOptions = ['direct', 'opaque', 'transparent', 'window']

      if (parameters.hasOwnProperty('wmode')) {
        if (wmodeOptions.indexOf(parameters.wmode) >= 0) {
          wmodeValue = parameters.wmode
        }
        delete parameters.wmode
      }

      swfobject.embedSWF(
        '/swf/StrobeMediaPlayback.swf',
        'StrobeMediaPlayback',
        '100%'/*width*/,
        '100%'/*height*/,
        '10.3.0',
        'expressInstall.swf',
        parameters, {
          allowFullScreen: 'true',
          wmode: wmodeValue
        }, {
          name: 'StrobeMediaPlayback'
        }
      )
    }
  }

  render() {
    return (
      <div id="StrobeMediaPlayback"></div>
    )
  }
}

@pure
class StreamPlayer extends Component {
  static propTypes = {};

  static supportsMediaSource() {
    const hasWebKit = (window.WebKitMediaSource !== null && window.WebKitMediaSource !== undefined)
    const hasMediaSource = (window.MediaSource !== null && window.MediaSource !== undefined)
    return (hasWebKit || hasMediaSource)
  }

  render() {
    const { stream } = this.props
    const { type, thumbnail } = stream
    const isUpcoming = type && type.id === 3 // todo: magic number
    // todo: thumbnail
    //const thumbnailUrl = thumbnail === null ? '/img/thumbnail_default.jpg' : thumbnail
    const thumbnailUrl = '/img/event.jpg'

    return (
      <div className='stream-player'>
        {StreamPlayer.supportsMediaSource() ? (
          <FlashPlayer stream={stream}/>
        ) : (
          <FlashPlayer stream={stream}/>
        )}
      </div>
    )
  }
}

export default StreamPlayer
