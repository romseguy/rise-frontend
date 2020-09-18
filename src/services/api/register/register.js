import api from 'services/api'

const base = '/register'

export default {
  ...api,

  register(options) {
    const payload = {...options, body: JSON.stringify(options.body)}
    return this.post(base, payload)
  },

  fbRegister(options) {
    const payload = {...options, body: JSON.stringify(options.body)}
    return this.post(`${base}/facebook`, payload)
  }
}
