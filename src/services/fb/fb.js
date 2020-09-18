export default {
  me() {
    return new Promise((resolve, reject) => {
      FB.api('/me', function(response) {
        resolve(response)
      })
    })
  },

  getFields(id, fields) {
    pre: id && id.length > 0
    pre: Array.isArray(fields)
    return new Promise((resolve, reject) => {
      FB.api(`/${id}?fields=${fields.join(',')}`, response => resolve(response))
    })
  }
}
