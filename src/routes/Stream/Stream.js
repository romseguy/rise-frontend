import './Stream.scss'

import { isEmpty, find, propEq, map } from 'ramda'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import translate from 'decorators/translate'
import {Gateway} from 'react-gateway'
import cx from 'classnames'

import StreamPlayer from 'components/StreamPlayer'
import StreamPlayerOverlay from 'components/StreamPlayerOverlay'
import StreamSide from 'components/StreamSide'
import LoadingWrapper from 'components/common/LoadingWrapper'
import Button from 'components/common/Button'

import { activeStreamSelector, subscribersSelector } from 'redux/modules/streams'
import { meUserSelector } from 'redux/modules/users'
import { meSelector } from 'redux/modules/auth'

import * as StreamActions from './actions'

function mapStateToProps(state) {
  const my = meSelector(state)
  const me = meUserSelector(state)
  const stream = activeStreamSelector(state)
  const subscribers = subscribersSelector(state)
  const isLoading = isEmpty(stream)
  const isLoggedIn = !isEmpty(my)

  let isStreamSubscribed = false
  let isStreamerFollowed = false

  if (subscribers.length > 0) {
    isStreamSubscribed = !!find(propEq('username', my.username))(subscribers)
  }

  if (!isLoading && !isEmpty(me)) {
    isStreamerFollowed = !!me.following[stream.author.username]
  }

  return {
    isLoading,
    isStreamerFollowed,
    isStreamSubscribed,
    isLoggedIn,
    me,
    stream
  }
}

function mapDispatchToProps(dispatch) {
  return map(action => bindActionCreators(action, dispatch), StreamActions)
}

@translate('Stream')
@connect(mapStateToProps, mapDispatchToProps)
class Stream extends Component {
  componentDidMount() {
    const { params: { hash }, onOpen } = this.props
    onOpen({hash})
  }

  render() {
    const {
      strings,
      isLoading,
      isStreamerFollowed,
      isStreamSubscribed,
      isLoggedIn,
      me,
      stream,
      onClose,
      onFollow,
      onUnfollow,
      onSubscribe,
      onUnsubscribe
      } = this.props

    const { hash, type = {} } = stream
    const isUpcoming = type && type.id === 3 // todo: magic number
    const className = cx('stream bk-player shadow scroll-wrapper', {
      'event-past': type.name === 'Replay',
      'event-live': type.name === 'Live',
      'event-upcoming': type.name === 'Upcoming'
    })

    return (
      <Gateway into='modal'>
        <div className='overlay'>
          <div className={className}>
            <button className='stream__side__close close' onClick={onClose}>
              {strings.close}
            </button>

            <LoadingWrapper
              className='loading-wrapper loading-wrapper--absolute container'
              isLoading={isLoading}
            >
              <div className='grid-7 grid-mobile-12'>
                <div className='video'>
                  <div className='wrapper-video'>
                    {isUpcoming ? (
                      <StreamPlayerOverlay
                        stream={stream}
                      />
                    ) : (
                      <StreamPlayer
                        stream={stream}
                      />
                    )}
                  </div>
                </div>
                {isUpcoming && (
                  <div className='option'>
                    {!isStreamSubscribed ? (
                      <Button
                        className='stream__subscribe follow'
                        onClick={() => onSubscribe({hash})}
                      >
                        {strings.subscribe}
                      </Button>
                    ) : (
                      <Button
                        className='stream__unsubscribe follow'
                        onClick={() => onUnsubscribe({hash})}
                      >
                        {strings.unsubscribe}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <StreamSide
                me={me}
                stream={stream}
                onClose={onClose}
                onFollow={username => isStreamerFollowed ? onUnfollow({username}) : onFollow({username})}
                isLoggedIn={isLoggedIn}
                isStreamerFollowed={isStreamerFollowed}
              />
            </LoadingWrapper>
          </div>
        </div>
      </Gateway>
    )
  }
}

export default Stream
