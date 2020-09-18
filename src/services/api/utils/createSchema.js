import { clone } from 'ramda'

/* eslint-disable quotes */
/* eslint-disable quote-props */
const schema = {
  "type": "object",
  "required": ["data"],
  "properties": {
    "data": {
      "type": ["object", "array"],
      "required": [],
      "properties": {
        "code": {
          "type": "number"
        },
        "message": {
          "type": "string"
        },
        "status": {
          "type": "string",
          "enum": ["success", "error"]
        }
      }
    }
  }
}

export default function createSchema(newDataProperties) {
  let newSchema = clone(schema)
  let data = newSchema.properties.data

  Object.keys(newDataProperties).map(newKey => {
    data.required.push(newKey)
    data.properties[newKey] = newDataProperties[newKey]
  })

  return newSchema
}
