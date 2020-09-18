import api from 'services/api'
import validate from 'lib/utils/validate'

const base = '/streams'

export default {
  ...api,

  getStreams(options) {
    return this.get(base, options)
  },

  getPastStreams(options) {
    return this.get(`${base}/replay`, options)
  },

  getLiveStreams(options) {
    return this.get(`${base}/live`, options)
  },

  getUpcomingStreams(options) {
    return this.get(`${base}/upcoming`, options)
  },

  postUpcomingStream(options) {
    const body = options.body
    const bodySchema = {
      type: 'object',
      required: ['title'],
      properties: {
        title: {type: 'string'},
        description: {type: 'string'},
        url: {type: 'string'},
        latitude: {type: 'number'},
        longitude: {type: 'number'},
        chat_enabled: {type: 'boolean'},
        thumbnail: {type: 'object'},
        upcoming_date: {type: 'object'},
        privacy: {
          type: 'object',
          properties: {
            id: {type: 'number'},
            name: {type: 'string'}
          }
        },
        tags: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'name'],
            properties: {
              id: {type: 'number'},
              name: {type: 'string'}
            }
          }
        }
      }
    }

    assert: {
      validate(body, bodySchema)
    }
    const bodyKeys = Object.keys(body)
    const data = new FormData()

    for (let i = 0; i < bodyKeys.length; i++) {
      data.append(bodyKeys[i], body[bodyKeys[i]])
    }

    return this.post(`${base}/upcoming`, {
      ...options,
      body: data
    })
  },

  getSubscribers(hash, options) {
    return this.get(`${base}/${hash}/subscribers`, options)
  },

  subscribe(hash) {
    return this.get(`${base}/${hash}/subscribe`)
  },

  unsubscribe(hash) {
    return this.get(`${base}/${hash}/unsubscribe`)
  }
}
