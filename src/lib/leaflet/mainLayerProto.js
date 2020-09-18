const mainLayerProto = L => {
  return {
    initialize(url, options) {
      L.TileLayer.prototype.initialize.call(this, url.toLowerCase(), options)
    }
  }
}

export default mainLayerProto
