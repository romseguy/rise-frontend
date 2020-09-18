import './NewsfeedRow.scss'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import cx from 'classnames'
import { formatDate } from 'redux/modules/streams/utils'

@pure
class NewsfeedRow extends Component {
  static propTypes = {
    onTitleClick: PropTypes.func
  };

  render() {
    const { stream, onRowTitleClick } = this.props
    const { author, thumbnail, title, description, tags, type, created_at } = stream
    const thumbnailUrl = thumbnail === null ? '/img/thumbnail_default.jpg' : thumbnail
    const className = cx('newsfeed-row bk-news-feed shadow', {
      'event-past': type.name === 'Replay',
      'event-live': type.name === 'Live',
      'event-upcoming': type.name === 'Upcoming'
    })

    return (
      <li className={className}>
        <a className='newsfeed-row__header author'>
          <div className='photo'>
            <img src={author.picture}/>
          </div>
          <span>{author.username}</span>
        </a>

        <div className='newsfeed-row__infos infos'>
          {formatDate(created_at)}
        </div>

        <div className='newsfeed-row__thumbnail une'>
          <span className={type.name.toLowerCase()}>{type.name}</span>
          <img src={thumbnailUrl}/>
        </div>

        <div className='content'>
          <h2
            className='newsfeed-row__title like-h2'
            onClick={e => onRowTitleClick(stream)}
          >
            {title}
          </h2>

          <div className='place'>TODO</div>

          <p className='newsfeed-row__description'>
            {description}
          </p>
          <div className='newsfeed-row__tags hashtag'>
            {tags.map(tag => `#${tag.name}`).join(' ')}
          </div>

          <div className="share">
            <span>Share on</span>
            <ul className="no-list">
              {/*<li>
               <button class="rise">Partager sur Rise</button>
               </li>*/}
              <li>
                <button className="facebook">Partager sur Facebook</button>
              </li>
              {/*<li>
               <button class="twitter">Partager sur Twitter</button>
               </li>*/}
            </ul>
          </div>
        </div>
      </li>
    )
  }
}

export default NewsfeedRow
