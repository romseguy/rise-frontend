import './StreamPlayerOverlay.scss'

import { isEmpty } from 'ramda'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import StreamPlayerCountdown from 'components/StreamPlayerCountdown'
import translate from 'decorators/translate'

@translate('StreamPlayerOverlay')
@pure
class StreamPlayerOverlay extends Component {
  static propTypes = {};

  render() {
    const { strings, stream } = this.props

    return (
      <div className='stream-player-overlay event'>
        <div className='title'>{strings.header}</div>
        <StreamPlayerCountdown stream={stream} />
      </div>
    )
  }
}

export default StreamPlayerOverlay
