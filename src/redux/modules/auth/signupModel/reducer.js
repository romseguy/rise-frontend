import { modelReducer } from 'react-redux-form'

const initialState = {
  username: '',
  email: '',
  password: '',
  password2: ''
}

const reducer = modelReducer('signupForm', initialState)

export default function signupModel(state = initialState, action = {}) {
  let model = reducer(state, action)

  return model
}
