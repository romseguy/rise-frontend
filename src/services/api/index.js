import api from './api'

if (__DEVELOPMENT__ && __CLIENT__) {
  window.api = api
}

export default api
