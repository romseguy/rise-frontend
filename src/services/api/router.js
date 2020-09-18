/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
import Express from 'express'
import streams from './mocks/streams'

const router = Express.Router()

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/* eslint-disable quotes */
/* eslint-disable quote-props */
router
  .get('/auth', (req, res) => {
    res.json(
      {
        "status": "success",
        "code": 0,
        "message": "",
        "data": {
          "user": {
            "username": "testuser01@risenews.tv",
            "email": "testuser01@risenews.tv",
            "locked": false,
            "id": 3,
            "firstname": "Test",
            "lastname": "User",
            "created_at": "2016-01-06T15:43:26+0100"
          }
        }
      }
    )
  })
  .get('/newsfeed', (req, res) => {
    setTimeout(() => {
      res.json(
        {
          "status": "success",
          "code": 0,
          "message": "",
          "data": {
            "streams": streams
          }
        }
      )
    }, 1000)
  })
  .get('/newsfeed/replay', (req, res) => {
    setTimeout(() => {
      res.json(
        {
          "status": "success",
          "code": 0,
          "message": "",
          "data": {
            "streams": streams.filter(stream => stream.type.name === 'Replay')
          }
        }
      )
    }, 1000)
  })
  .get('/newsfeed/live', (req, res) => {
    setTimeout(() => {
      res.json(
        {
          "status": "success",
          "code": 0,
          "message": "",
          "data": {
            "streams": streams.filter(stream => stream.type.name === 'Live')
          }
        }
      )
    }, 1000)
  })
  .get('/newsfeed/upcoming', (req, res) => {
    setTimeout(() => {
      res.json(
        {
          "status": "success",
          "code": 0,
          "message": "",
          "data": {
            "streams": streams.filter(stream => stream.type.name === 'Upcoming')
          }
        }
      )
    }, 1000)
  })
  .get('/streams', (req, res) => {
    res.json(
      {
        "status": "success",
        "code": 0,
        "message": "",
        "data": {
          "streams": streams
        }
      }
    )
  })
  .get('/streams/replay', (req, res) => {
    res.json(
      {
        "status": "success",
        "code": 0,
        "message": "",
        "data": {
          "streams": [{
            "title": "encore une testouille ",
            "description": "encore et encore ",
            "url": null,
            "created_at": "2016-01-11T17:05:18+0100",
            "status": {"id": 1, "name": "Published"},
            "privacy": {"id": 1, "name": "Public"},
            "latitude": 48.84889,
            "longitude": 2.349907,
            "chat_enabled": true,
            "hash": "a2Jlcm5hanVAZ21haWwuY29tLTIwMTYtSmFuLTExXzE3OjA1OjE4OjAwMDAwMC03MDg0",
            "author": {"username": "kbernaju@gmail.com", "id": 2},
            "tags": [{"id": 4, "name": "Test"}, {"id": 8, "name": "Steven Wilson"}],
            "started_at": null,
            "thumbnail": null,
            "type": {"id": 4, "name": "Replay"}
          }]
        }
      }
    )
  })
  .get('/streams/live', (req, res) => {
    res.json(
      {
        "status": "success",
        "code": 0,
        "message": "",
        "data": {
          "streams": [{
            "title": "LE TEST DU REFRESH ",
            "description": "",
            "url": null,
            "created_at": "2016-01-11T18:36:38+0100",
            "status": {"id": 1, "name": "Published"},
            "privacy": {"id": 1, "name": "Public"},
            "latitude": 48.84877,
            "longitude": 2.352683,
            "chat_enabled": true,
            "hash": "a2Jlcm5hanVAZ21haWwuY29tLTIwMTYtSmFuLTExXzE4OjM2OjM4OjAwMDAwMC0wNDI2",
            "author": {"username": "kbernaju@gmail.com", "id": 2},
            "tags": [{"id": 18, "name": "LETESTDUREFRESH"}],
            "started_at": null,
            "thumbnail": null,
            "type": {"id": 4, "name": "Live"}
          }]
        }
      }
    )
  })
  .get('/streams/upcoming', (req, res) => {
    res.json(
      {
        "status": "success",
        "code": 0,
        "message": "",
        "data": {
          "streams": [{
            "title": "au revoir ",
            "description": "au revoir ",
            "url": null,
            "created_at": "2016-01-11T17:36:46+0100",
            "status": {"id": 1, "name": "Published"},
            "privacy": {"id": 1, "name": "Public"},
            "latitude": 48.84894,
            "longitude": 2.349889,
            "chat_enabled": true,
            "hash": "a2Jlcm5hanVAZ21haWwuY29tLTIwMTYtSmFuLTExXzE3OjM2OjQ2OjAwMDAwMC00MjA0",
            "author": {"username": "kbernaju@gmail.com", "id": 2},
            "tags": [{"id": 1, "name": "Streaming"}, {"id": 4, "name": "Test"}],
            "started_at": null,
            "thumbnail": null,
            "type": {"id": 4, "name": "Upcoming"}
          }]
        }
      }
    )
  })

export default router
