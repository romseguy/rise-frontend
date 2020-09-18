/* global __DEVELOPMENT__:true */
import 'isomorphic-fetch'
import Frisbee from 'frisbee'

import wsse from 'wsse'
import { baseURI, localURI } from './config'
import store from 'store2'
import validate from 'lib/utils/validate'

const frisbee = new Frisbee({
  baseURI,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  ...frisbee,

  get(path, options = {}) {
    this.auth(options)

    if (__DEVELOPMENT__ && options.mocked) {
      this.opts.baseURI = localURI
    } else {
      this.opts.baseURI = baseURI
    }

    return frisbee.get(path, options)
  },

  post(path, options) {
    this.auth(options)

    return frisbee.post(path, options)
  },

  put(path, options) {
    this.auth(options)

    return frisbee.put(path, options)
  },

  del(path, options) {
    this.auth(options)

    return frisbee.del(path, options)
  },

  auth(options) {
    if (options && options.skipAuth) {
      delete this.headers['X-WSSE']
      delete this.headers['fb-auth']
      return
    }

    const credsSchema = {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    }

    const fbtoken = this.getFbToken()

    if (fbtoken) {
      this.headers['fb-auth'] = `FBToken UID="${fbtoken.userID}", AccessToken="${fbtoken.accessToken}"`
    } else {
      pre: {
        validate(options, {
          type: 'object',
          properties: {
            skipAuth: {
              type: 'boolean'
            },
            creds: credsSchema
          }
        })
      }

      const creds = options && options.creds || this.getStoredCreds()

      if (validate(creds, credsSchema)) {
        this.headers['X-WSSE'] = wsse(creds).getWSSEHeader({nonceBase64: true})
      }
    }
  },

  setStoredCreds(token) {
    store.set('token', JSON.stringify(token))
  },

  getStoredCreds() {
    const token = store.get('token')
    return token !== 'undefined' ? JSON.parse(token) : undefined
  },

  removeStoredCreds() {
    store.remove('token')
  },

  setFbToken(token) {
    store.set('fbtoken', JSON.stringify(token))
  },

  getFbToken() {
    const token = store.get('fbtoken')
    return token !== 'undefined' ? JSON.parse(token) : undefined
  },

  removeFbToken() {
    store.remove('fbtoken')
  },

  getResponseData(response, key) {
    if (!response) {
      return undefined
    }

    const body = response.body || response

    if (!body.data) {
      return undefined
    }

    if (!key) {
      return body.data
    }

    return body.data[key]
  }
}
