import createSchema from 'services/api/utils/createSchema'

/* eslint-disable quotes */
/* eslint-disable quote-props */
export default {
  '/': createSchema({
    "streams": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "title",
          "description",
          "created_at",
          "status",
          "privacy",
          "latitude",
          "longitude",
          "chat_enabled",
          "hash",
          "author",
          "tags",
          "started_at",
          "thumbnail",
          "type"
        ],
        "properties": {
          "title": {"type": "string"},
          "description": {"type": ["string", "null"]},
          "created_at": {"type": "string"},
          "status": {
            "type": "object",
            "properties": {
              "id": {"type": "number"},
              "name": {"type": "string"}
            }
          },
          "privacy": {
            "type": "object",
            "properties": {
              "id": {"type": "number"},
              "name": {"type": "string"}
            }
          },
          "latitude": {"type": ["number", "null"]},
          "longitude": {"type": ["number", "null"]},
          "chat_enabled": {"type": "boolean"},
          "hash": {"type": "string"},
          "author": {
            "type": "object",
            "properties": {
              "username": {"type": "string"},
              "id": {"type": "number"}
            }
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {"type": "number"},
                "name": {"type": "string"}
              }
            }
          },
          "started_at": {"type": ["string", "null"]},
          "thumbnail": {"type": ["string", "null"]},
          "type": {
            "type": "object",
            "properties": {
              "id": {"type": "number"},
              "name": {"type": "string"}
            }
          }
        }
      }
    }
  }),
  '/subscribers': createSchema({

  })
}
