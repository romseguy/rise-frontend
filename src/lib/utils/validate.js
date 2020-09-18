import validator from 'is-my-json-valid'

export default function validate(value, schema) {
  return validator(schema)(value)
}
