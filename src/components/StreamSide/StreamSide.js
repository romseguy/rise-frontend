import './StreamSide.scss'
import { isEmpty } from 'ramda'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import translate from 'decorators/translate'
import { formatDate } from 'redux/modules/streams/utils'
import Button from 'components/common/Button'

@translate('StreamSide')
@pure
class StreamSide extends Component {
  static propTypes = {
    isStreamerFollowed: PropTypes.bool,
    strings: PropTypes.object,
    stream: PropTypes.object,
    onClose: PropTypes.func,
    onFollow: PropTypes.func
  };

  handleFollow() {
    this.props.onFollow(this.props.stream.author.username)
  }

  render() {
    const { strings, stream, onClose, isStreamerFollowed, me, isLoggedIn } = this.props
    const { hash, author, title, created_at, description, tags, type, location } = stream

    return (
      <div className='stream__side grid-5 grid-mobile-12'>

        {/* todo: StreamAuthor component */}
        <div className='stream__side__author author'>
          <div className='photo'>
            <img src={author.picture}/>
          </div>
          <span>{author.username}</span>
        </div>

        {isLoggedIn && (
          <Button
            className='follow'
            onClick={::this.handleFollow}
          >
            <span>+</span>
            <div>{isStreamerFollowed ? strings.unfollow : strings.follow}</div>
          </Button>
        )}

        {/* todo: StreamInfos component */}
        <div className='text'>
          {/* todo: <a class="edit" href="#">edit your post</a> */}

          <div className='stream__side__title'>
            <h2 className='like-h2'>{title}</h2>
          </div>

          <span className='place'>{location === null ? 'unknown' : location}</span>

          <span className='stream__side__date infos'>
            {formatDate(created_at)}
          </span>

          {/* todo tags */}

          <p className='stream__side__description'>
            {description}
          </p>

          <div className='share'>
            <span>Share on</span>
            <ul className='no-list'>
              {/*<li>
               <Button className='rise'>Partager sur Rise</Button>
               </li>*/}
              <li>
                <Button
                  className='facebook'
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=risenews.tv/streams/${hash}`, 'pwin', 'location=no,status=no,scrollbars=no,resizeable=yes,toolbar=no,width=600,height=300')}
                >
                  Share on Facebook
                </Button>
              </li>
              {/*<li>
               <Button className='twitter'>Partager sur Twitter</Button>
               </li>*/}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default StreamSide
