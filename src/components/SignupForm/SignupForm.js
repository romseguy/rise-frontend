import './SignupForm.scss'

import React, { Component } from 'react'
import { Form, Field, actions, getField } from 'react-redux-form'
import translate from 'decorators/translate'
import pure from 'decorators/pure'
import { isEmpty } from 'ramda'

@translate('SignupForm')
@pure
class SignupForm extends Component {

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit && this.props.onSubmit(this.props.model)
  }

  render() {
    const { strings, model, form } = this.props
    return (
      <div>

        <h2 className='like-h2'>{strings.header}</h2>

        <form onSubmit={::this.handleSubmit}>
          <div className='signup-form__username'>
            <Field model='signupForm.username'>
              <input type='text' placeholder={strings.username}/>
            </Field>
          </div>

          <div className='signup-form__email'>
            <Field model='signupForm.email'>
              <input type='text' placeholder={strings.email}/>
            </Field>
          </div>

          <div className='signup-form__password'>
            <Field model='signupForm.password'>
              <input type='password' placeholder={strings.password}/>
            </Field>
          </div>

          <div className='signup-form__password2'>
            <Field model='signupForm.password2'>
              <input type='password' placeholder={strings.password2}/>
            </Field>
          </div>

          <input type='submit' value={strings.login}/>
        </form>

      </div>
    )
  }
}

export default SignupForm
