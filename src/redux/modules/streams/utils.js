import { is } from 'ramda'
import moment from 'moment'
import cx from 'classnames'

const format = 'MMM DD, YYYY - HH:mm'

export function formatDate(string) {
  if (typeof string === 'string' || string === undefined) {
    return moment(string).format(format)
  } else if (is(Object, string) && string.format) {
    return string.format(format)
  }
}

export function getTooltip(stream) {
  const { author, created_at, tags, title, description, type, thumbnail, location } = stream
  const className = cx('map-marker-popup tooltip shadow', {
    'event-past': type.name === 'Replay',
    'event-live': type.name === 'Live',
    'event-upcoming': type.name === 'Upcoming'
  })

  // see Map.scss for styles
  // todo: ruban
  return `
    <div class="${className}">
      <div class="map-marker-popup__author author">
        <div class="photo">
          <img src="${author.picture}"/>
        </div>
        <span>${author.username}</span>
      </div>
      <div class="map-marker-popup__created_at infos">
        ${formatDate(created_at)}
      </div>
      <div class="map-marker-popup__thumbnail photo">
        <span class="${'live'/* TODO: type.name.toLowerCase()*/}">${type.name}</span>
        <img src="/img/event.jpg"/>
      </div>
      <div class="text">
        <a class="map-marker-popup__title">
          <h2 class="like-h2">${title}</h2>
        </a>
        <div class="place">
          ${location === null ? 'unknown' : location}
        </div>
        <p class="map-marker-popup__description">
          ${description}
        </p>
        <div class="map-marker-popup__tags hashtag">
          ${tags.map(tag => `<span class="map-marker-popup__tags__tag">#${tag.name}</span>`).join('')}
        </div>
      </div>
    </div>
  `
}
