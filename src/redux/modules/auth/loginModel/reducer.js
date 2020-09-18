import { modelReducer } from 'react-redux-form'

const initialState = {
  email: '',
  password: ''
}

const reducer = modelReducer('loginForm', initialState)

export default function loginModel(state = initialState, action = {}) {
  let model = reducer(state, action)

  return model
}
