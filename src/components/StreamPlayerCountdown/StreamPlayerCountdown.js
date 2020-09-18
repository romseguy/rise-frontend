import './StreamPlayerCountdown.scss'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'

@pure
class StreamPlayerCountdown extends Component {
  static propTypes = {};

  render() {
    const { stream } = this.props

    return (
      <div className='stream-player-countdown time'>
        <span className='stream-player-countdown__days'>01</span>
        <div className='notaghack'>:</div>
        <span className='stream-player-countdown__hours'>18</span>
        <div className='notaghack'>:</div>
        <span className='stream-player-countdown__minutes'>32</span>
        <div className='notaghack'>:</div>
        <span className='stream-player-countdown__seconds'>14</span>
      </div>
    )
  }
}

export default StreamPlayerCountdown
