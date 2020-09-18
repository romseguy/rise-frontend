import types from 'redux/types'
import createAction from 'fsa-creator'

export const onOutsideClick = createAction(types.UI_AUTH_OUTSIDE_CLICKED)

export const onFacebookClick = createAction(types.UI_AUTH_FACEBOOK_CLICKED)

export const LoginFormActions = {
  onSubmit: createAction(types.UI_LOGIN_FORM_SUBMITTED, {
    type: 'object',
    required: ['user'],
    properties: {
      user: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          username: {type: 'string'},
          //email: {format: 'email'}, // todo: handle client-side validation
          email: {type: 'string'},
          password: {type: 'string'}
        }
      }
    }
  })
}

export const SignupFormActions = {
  onSubmit: createAction(types.UI_SIGNUP_FORM_SUBMITTED, {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      username: {type: 'string'},
      //email: {format: 'email'}, // todo: handle client-side validation
      email: {type: 'string'},
      password: {type: 'string'},
    }
  })
}
