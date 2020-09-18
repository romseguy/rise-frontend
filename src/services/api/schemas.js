import createSchema from 'services/api/utils/createSchema'

/* eslint-disable quotes */
/* eslint-disable quote-props */
export default {
  '/register': createSchema({
    "user": {
      "type": "object",
      "required": [
        "username",
        "email",
        "locked",
        "id",
        "display_name",
        "firstname",
        "lastname",
        "followers_count",
        "followings_count",
        "created_at",
        "picture",
        "gender",
        "type"
      ],
      "properties": {
        "username": {"type": "string"},
        "email": {"type": "string"},
        "locked": {"type": "boolean"},
        "id": {"type": "number"},
        "firstname": {"type": ["null", "string"]},
        "lastname": {"type": ["null", "string"]},
        "followers_count": {type: ["null", "number"]},
        "followings_count": {type: ["null", "number"]},
        "created_at": {"type": "string"},
        "picture": {"type": ["string", "null"]},
        "gender": {type: ["null", "string"]},
        "type": {type: ["null", "string"]}
      }
    }
  })
}
