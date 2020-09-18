/* global L:true */
import { contains } from 'ramda'

export function createCluster(streams) {
  return cluster => {
    const types = cluster.getAllChildMarkers().map(marker => {
      const { lat, lng } = marker.getLatLng()
      const streamsAtLatLng = streams.filter(stream => stream.latitude === lat && stream.longitude === lng)
      return streamsAtLatLng[0].type.name
    })

    // todo: integration
/*    let src = '/img/marker-past-icon.png'

    if (contains('Live', types)) {
      src = '/img/marker-live-icon.png'
    } else if (contains('Upcoming', types)) {
      src = '/img/marker-upcoming-icon.png'
    }*/

    const src = '/img/marker-icon.png'
    const markersCount = cluster.getChildCount()

    return L.divIcon({
      html: `
        ${markersCount > 1 ? `<span class="map__cluster__child-count" >${markersCount}</span>` : ``}
        <img
          src="${src}"
          class="leaflet-marker-icon leaflet-zoom-animated leaflet-clickable"
        />
      `
    })
  }
}
