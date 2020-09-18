import './NewsfeedFilter.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { map } from 'ramda'
import translate from 'decorators/translate'

import types from 'redux/types'
import { filterSelector } from 'redux/modules/newsfeed'

import TimeMachine from 'components/TimeMachine'
import * as NewsfeedFilterActions from './actions'

function mapStateToProps(state) {
  return {
    newsfeedFilter: filterSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return map(action => bindActionCreators(action, dispatch), NewsfeedFilterActions)
}

@translate('NewsfeedFilter')
@connect(mapStateToProps, mapDispatchToProps)
class NewsfeedFilter extends Component {

  render() {
    const { strings, newsfeedFilter, onPastClick, onLiveClick, onUpcomingClick } = this.props
    return (
      <div className='newsfeed-filter'>
        <TimeMachine
          active={newsfeedFilter.type}
          onPastClick={onPastClick}
          onLiveClick={onLiveClick}
          onUpcomingClick={onUpcomingClick}
        />
      </div>
    )
  }
}

export default NewsfeedFilter
