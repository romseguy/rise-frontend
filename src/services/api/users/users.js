import api from 'services/api'

const base = '/users'

export default {
  ...api,

  followUser(username) {
    return this.get(`${base}/${username}/follow`)
  },

  unfollowUser(username) {
    return this.get(`${base}/${username}/unfollow`)
  },

  getFollowing(username) {
    if (!username) {
      return this.get(`${base}/me/following`)
    }

    return this.get(`${base}/${username}/following`)
  }
}
