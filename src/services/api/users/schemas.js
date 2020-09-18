import createSchema from 'services/api/utils/createSchema'

/* eslint-disable quotes */
/* eslint-disable quote-props */
export default {
  '/following': createSchema({
    "following": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "number"},
          "username": {"type": "string"}
        }
      }
    }
  })
}
