import './StreamsListRow.scss'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'

@pure
class StreamsListRow extends Component {
  static propTypes = {
    stream: PropTypes.shape({
      title: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
      }))
    })
  };

  handleClick(e) {
    this.props.onClick(e, this.props.stream)
  }

  render() {
    const { stream } = this.props
    const { thumbnail, title, tags, location } = stream
    // todo: thumbnail
    //const thumbnailUrl = thumbnail === null ? '/img/thumbnail_default.jpg' : thumbnail
    const thumbnailUrl = '/img/event.jpg'

    return (
      <li className='streams-list-row'>
        <a
          className='streams-list-row__thumbnail photo'
          onClick={::this.handleClick}
        >
          <img src={thumbnailUrl}/>
        </a>
        <div className='streams-list-row__side text'>
          <h2 className='streams-list-row__title like-h2'>
            <a onClick={::this.handleClick}>{title}</a>
          </h2>
          <div className='place'>{location === null ? 'unknown' : location}</div>
          <div className='hashtag'>
            {tags.map(tag => `#${tag.name}`).join(' ')}
          </div>
        </div>
      </li>
    )
  }
}

export default StreamsListRow
