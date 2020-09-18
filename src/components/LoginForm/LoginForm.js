import './LoginForm.scss'

import React, { Component } from 'react'
import { Field, actions } from 'react-redux-form'
import translate from 'decorators/translate'
import pure from 'decorators/pure'

@translate('LoginForm')
@pure
class LoginForm extends Component {

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit && this.props.onSubmit({user: this.props.model})
  }

  render() {
    const { strings, model } = this.props
    return (
      <div>

        <h2 className='like-h2'>{strings.header}</h2>

        <form onSubmit={::this.handleSubmit}>
          <div className='login-form__email'>
            <Field model='loginForm.email'>
              <input type='text' placeholder={strings.email}/>
            </Field>
          </div>

          <div className='login-form__password'>
            <Field model='loginForm.password'>
              <input type='password' placeholder={strings.password}/>
            </Field>
          </div>
          <input type='submit' value={strings.login}/>
        </form>

      </div>
    )
  }
}

export default LoginForm
