import api from 'services/api'

const base = '/newsfeed'

export default {
  ...api,

  getNewsfeed(options) {
    return this.get(base, options)
  },

  getPastNewsfeed(options) {
    return this.get(`${base}/replay`, options)
  },

  getLiveNewsfeed(options) {
    return this.get(`${base}/live`, options)
  },

  getUpcomingNewsfeed(options) {
    return this.get(`${base}/upcoming`, options)
  }
}
