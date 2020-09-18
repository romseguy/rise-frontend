import './StreamsFilter.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import translate from 'decorators/translate'
import { map } from 'ramda'

import { streamFilterSelector } from 'redux/modules/streams'

import TimeMachine from 'components/TimeMachine'
import * as StreamsFilterActions from './actions'

function mapStateToProps(state) {
  return {
    streamFilter: streamFilterSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return map(action => bindActionCreators(action, dispatch), StreamsFilterActions)
}

@translate('StreamsFilter')
@connect(mapStateToProps, mapDispatchToProps)
class StreamsFilter extends Component {

  render() {
    const { strings, streamFilter, onPastClick, onLiveClick, onUpcomingClick } = this.props
    return (
      <div className='streams-filter'>
        <TimeMachine
          active={streamFilter.type}
          onPastClick={onPastClick}
          onLiveClick={onLiveClick}
          onUpcomingClick={onUpcomingClick}
        />
      </div>
    )
  }
}

export default StreamsFilter
