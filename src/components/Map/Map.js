/* global L:true */
import '../../lib/leaflet/MarkerCluster.Default.css'
import '../../lib/leaflet/MarkerCluster.css'
import './Map.scss'
import React, { Component } from 'react'

class Map extends Component {
  componentDidMount() {
    const {
      onLoad,
      latitude, longitude, initialZoom, minZoom, maxZoom
      } = this.props

    const map = new L.Map(this.refs.map, {
      center: new L.LatLng(latitude, longitude),
      zoomControl: false,
      zoom: initialZoom,
      minZoom,
      maxZoom,
      attributionControl: false // todo give credit to Leaflet
    })

    onLoad(map)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    return (
      <div
        id='map'
        ref='map'
      />
    )
  }
}

export default Map
