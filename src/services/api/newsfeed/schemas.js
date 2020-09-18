import createSchema from 'services/api/utils/createSchema'
import streamsSchema from 'services/api/streams/schemas'

/* eslint-disable quotes */
/* eslint-disable quote-props */
export default {
  '/': streamsSchema['/']
}
