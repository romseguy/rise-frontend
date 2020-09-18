import './Newsfeed.scss'

import R from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import translate from 'decorators/translate'

import Panel from 'components/common/Panel'
import NewsfeedRow from 'components/NewsfeedRow'
import LoadingWrapper from 'components/common/LoadingWrapper'
import * as NewsfeedActions from './actions'

import {
  loadingSelector,
  filterSelector,
  streamsSelector
} from 'redux/modules/newsfeed'

function mapStateToProps(state) {
  const isLoading = loadingSelector(state)
  const filter = filterSelector(state)
  const streams = streamsSelector(state)

  return {
    isLoading,
    filter,
    streams
  }
}

function mapDispatchToProps(dispatch) {
  return R.map(action => bindActionCreators(action, dispatch), NewsfeedActions)
}

@translate('Newsfeed')
@connect(mapStateToProps, mapDispatchToProps)
class Newsfeed extends Component {
  componentDidMount() {
    const { onOpen } = this.props
    onOpen()
  }

  handleClickOutside(e) {
    const hasExcludedClassName = R.compose(R.isEmpty, R.filter(className => R.isEmpty(R.match(/stream|overlay/, className))))

    if (!hasExcludedClassName(e.target.classList)) {
      this.props.onOutsideClick(e)
    }
  }

  render() {
    const {
      strings,

      isLoading,
      streams,

      onRowTitleClick
      } = this.props

    return (
      <div className='site-content size-menu'>
        <div className='newsfeed list-news-feed'>
          <LoadingWrapper isLoading={isLoading}>
            <Panel
              onOutsideClick={::this.handleClickOutside}
              className='newsfeed__scrollable-panel'
            >
              <ul className='no-list'>
                {streams.toJS().map((stream, index) => (
                  <NewsfeedRow
                    key={index}
                    stream={stream}
                    onRowTitleClick={onRowTitleClick}
                  />
                ))}
              </ul>
            </Panel>
          </LoadingWrapper>
        </div>
      </div>
    )
  }
}

export default Newsfeed
