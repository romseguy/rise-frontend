import { modelReducer } from 'react-redux-form'
import { formatDate } from 'redux/modules/streams/utils'

const initialState = {
  title: '',
  tags: [],
  description: '',
  location: '',
  date: formatDate()
}

const reducer = modelReducer('createEvent', initialState)

export default function createEventModel(state = initialState, action = {}) {
  let model = reducer(state, action)

  return model
}
