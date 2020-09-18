import './StreamsList.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import translate from 'decorators/translate'

import types from 'redux/types'
import {visibleStreamsOfTypeSelector} from 'redux/modules/streams'

import Panel from 'components/common/Panel'
import Button from 'components/common/Button'
import StreamsListRow from 'components/StreamsListRow'

function mapStateToProps(state) {
  return {
    streams: visibleStreamsOfTypeSelector(state).toJS()
  }
}

@translate('StreamsList')
@connect(mapStateToProps)
class StreamsList extends Component {

  state = {
    visible: false
  };

  handleClickOutside() {
    if (this.state.visible) {
      this.setState({visible: false})
    }
  }

  handleAnchorClick() {
    this.setState({visible: true})
  }

  handleRowClick(e, stream) {
    this.props.dispatch({
      type: types.UI_STREAM_LIST_ROW_CLICKED,
      payload: stream
    })
  }

  handleCloseClick() {
    this.setState({visible: false})
  }

  render() {
    const { strings, streams } = this.props

    return (
      <div className='streams-list'>
        {!this.state.visible && (

          <Button
            className='streams-list__anchor btn-filter-map shadow'
            onClick={::this.handleAnchorClick}
            disabled={streams.length === 0}
          >
            {strings.anchor}
            <i className='icon-featured'/>
          </Button>

        ) || (

          <Panel
            className='streams-list__panel bk-map-filter shadow'
            onOutsideClick={::this.handleClickOutside}
          >
            <Button
              className='stream-list__close close'
              onClick={::this.handleCloseClick}
            >
              {strings.close}
            </Button>
            <div className='streams-list__header filter'>
              <div className='title'>{/*strings.filter*/}</div>
              <ul className='no-list'>
                <li>
                  <a href="#">{/*TODO*/}</a>
                </li>
              </ul>
            </div>
            <div className='streams-list__result bk-result'>
              <ul className='no-list'>
                {streams.map((stream, index) => (
                  <StreamsListRow
                    key={index}
                    stream={stream}
                    onClick={::this.handleRowClick}
                  />
                ))}
              </ul>
            </div>
          </Panel>

        )}
      </div>
    )
  }
}

export default StreamsList
