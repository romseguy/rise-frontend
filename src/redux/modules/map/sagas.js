/* global L:true */
import { call, apply, take, put, fork, cps, select } from 'redux-saga/effects'
import types from 'redux/types'
import createAction from 'fsa-creator'
import makeError from 'make-error-cause'
const MapSagaError = makeError('MapSagaError')
import { zipObj, pluck, contains } from 'ramda'

import api from 'services/api'
import mainLayerProto from 'lib/leaflet/mainLayerProto'
import { mapSelector, markerSelector, markersLayerSelector } from 'redux/modules/map'
import { getTooltip } from 'redux/modules/streams/utils'
import { createCluster } from 'redux/modules/map/utils'
import waitForEvent from 'lib/utils/waitForEvent'

// action creators
const markersSet = createAction(types.SAGA_MAP_MARKERS_SET, {
  type: 'object',
  properties: {
    markerStreamMap: {
      type: 'object'
    },
    markersLayer: {
      type: 'object'
    }
  }
})

const markerPopupTitleClicked = createAction(types.UI_MAP_MARKER_POPUP_TITLE_CLICKED, {
  type: 'object',
  required: ['hash'],
  properties: {
    hash: {type: 'string'}
  }
})

function* setMainLayer() {
  while (true) {
    yield take(types.UI_MAP_LOADED)

    const map = yield select(mapSelector)
    const MainLayer = L.TileLayer.extend(mainLayerProto(L))

    // http://leafletjs.com/reference.html#tilelayer-options
    map.addLayer(new MainLayer('https://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.{format}?access_token={token}', {
      minZoom: 1,
      maxZoom: 20,
      mapid: 'mapbox.light',
      format: 'png',
      token: 'sk.eyJ1Ijoicm9tc2VndXkiLCJhIjoiY2lpZXE1ZGlqMDFmbXVia3N3N3kxenV2eCJ9.CIUYYwouFowP7sao7_micw'
    }))
  }
}

function* listenToMarkerPopupTitleClick(stream) {
  while (true) {
    const title = document.querySelector('.map-marker-popup__title')
    yield call(waitForEvent, title, 'click')
    yield put(markerPopupTitleClicked({hash: stream.hash}))
  }
}

function* listenToMarkerClick(stream, marker) {
  let opened = false

  while (true) {
    // can't use cps here since `event` will be handled as an error
    const waitFor = type => new Promise(resolve => marker.on(type, error => resolve(error)))
    yield call(waitFor, 'click')

    if (opened) {
      yield apply(marker, marker.closePopup)
      opened = false
    } else {
      yield apply(marker, marker.openPopup)
      opened = true
      yield fork(listenToMarkerPopupTitleClick, stream)
    }
  }
}

function* createMarker(stream) {
  const latlng = new L.LatLng(stream.latitude, stream.longitude)
  const marker = yield call(L.marker, latlng)
  yield apply(marker, marker.bindPopup, [getTooltip(stream)])
  yield fork(listenToMarkerClick, stream, marker)

  return marker
}

function* refreshMarkers() {
  while (true) {
    const { payload } = yield take([
      types.SAGA_STREAMS_RESPONSE,
      types.SAGA_STREAMS_PAST_RESPONSE,
      types.SAGA_STREAMS_LIVE_RESPONSE,
      types.SAGA_STREAMS_UPCOMING_RESPONSE
    ])

    const map = yield select(mapSelector)
    const streams = api.getResponseData(payload, 'streams') || []
    let prevMarkersLayer = yield select(markersLayerSelector)

    if (prevMarkersLayer) {
      map.removeLayer(prevMarkersLayer)
    }

    const markersLayer = L.markerClusterGroup({
      iconCreateFunction: createCluster(streams),
      singleMarkerMode: true
    })

    const markers = yield streams.map(stream => call(createMarker, stream))
    markersLayer.addLayers(markers)
    map.addLayer(markersLayer)

    yield put(markersSet({
      markerStreamMap: zipObj(pluck('hash', streams), markers),
      markersLayer
    }))
  }
}

// we can't use `yield cps([markersLayer, markersLayer.zoomToShowLayer], marker)`
function zoomToShowLayer(markersLayer, marker) {
  return new Promise((resolve, reject) => {
    markersLayer.zoomToShowLayer(marker, (cluster) => {
      // because cluster is not an error and cps is compatible with node-style callbacks only
      resolve(cluster)
    })
  })
}

function* moveToMarker() {
  while (true) {
    const { payload: stream } = yield take(types.UI_STREAM_LIST_ROW_CLICKED)

    const marker = yield select(markerSelector, [stream.hash])
    const markersLayer = yield select(markersLayerSelector)

    yield call(zoomToShowLayer, markersLayer, marker)
    yield apply(marker, marker.openPopup)
    yield fork(listenToMarkerPopupTitleClick, stream)
  }
}

function* moveTo() {
  while (true) {
    const {payload: {location: {lat, lng}, gmaps: {types: locationType}}} = yield take(types.UI_SEARCH_BAR_SUGGEST_SELECTED)
    const map = yield select(mapSelector)
    map.panTo(new L.LatLng(lat, lng))

    if (contains('country', locationType)) {
      map.setZoom(8)
    } else if (contains('locality', locationType)) {
      map.setZoom(15)
    } else if (contains('route', locationType)) {
      map.setZoom(20)
    }
  }
}

export default function* mapSaga() {
  try {
    yield [
      call(setMainLayer),
      call(refreshMarkers),
      call(moveToMarker),
      call(moveTo)
    ]
  } catch (cause) {
    let message = ''

    throw new MapSagaError(message, cause)
  }
}
