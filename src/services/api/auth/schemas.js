import createSchema from 'services/api/utils/createSchema'

/* eslint-disable quotes */
/* eslint-disable quote-props */
export default {
  '/': createSchema({
    "user": {
      "type": "object",
      "required": [
        "username",
        "email",
        "locked",
        "id",
        "firstname",
        "lastname",
        "created_at",
        "picture"
      ],
      "properties": {
        "username": {"type": "string"},
        "email": {"type": "string"},
        "locked": {"type": "boolean"},
        "id": {"type": "number"},
        "firstname": {"type": ["string", "null"]},
        "lastname": {"type": ["string", "null"]},
        "created_at": {"type": "string"},
        "picture": {"type": ["string", "null"]}
      }
    }
  })
}
