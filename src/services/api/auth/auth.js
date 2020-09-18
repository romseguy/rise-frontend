import api from 'services/api'

const base = '/auth'

export default {
  ...api,

  login(options) {
    return this.get(base, options)
  },

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(response => resolve(response))
    })
  },

  fbLogout() {
    return new Promise((resolve, reject) => {
      this.removeFbToken()
      FB.logout(response => resolve(response))
    })
  },

  getLoginStatus() {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus(function(response) {
        resolve(response)
      })
    })
  }
}
