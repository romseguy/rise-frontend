/* global L:true */
import { isEmpty } from 'ramda'
import { createSelector } from 'reselect'
import immu from 'immu'
import { mapSelector } from 'redux/modules/map'

// Input-selectors
const streamsSelector = state => state.streams
const uiSelector = state => state.streams.ui
const currentStreamSelector = state => uiSelector(state).currentStream
export const allStreamsSelector = state => streamsSelector(state).all
export const streamFilterSelector = state => uiSelector(state).streamFilter
export const streamFilterTypeSelector = state => streamFilterSelector(state).type
export const subscribersSelector = state => currentStreamSelector(state).subscribers

// Transform functions
function getVisibleStreams(streams, map) {
  return streams.filter(({ latitude, longitude }) => {
    if (latitude === null || longitude === null) {
      return false
    }
    return map.getBounds().contains(new L.LatLng(latitude, longitude))
  })
}

function getStreamByHash(streams, hash) {
  return streams.filter(stream => stream.hash === hash)[0] || immu({})
}

// Memoized selectors
export const activeStreamSelector = createSelector(
  allStreamsSelector,
  currentStreamSelector,
  (streams, currentStream) => getStreamByHash(streams, currentStream.hash)
)

export const visibleStreamsOfTypeSelector = createSelector(
  mapSelector,
  streamsSelector,
  streamFilterTypeSelector,
  (map, streams, type) => {
    if (!map || isEmpty(streams[type])) {
      return immu([])
    }

    return getVisibleStreams(streams[type], map)
  }
)
