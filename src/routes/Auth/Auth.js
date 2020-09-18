import './Auth.scss'

import R from 'ramda'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import translate from 'decorators/translate'

import { meSelector, authLoadingSelector, loginModelSelector, loginFormSelector, signupModelSelector, signupFormSelector } from 'redux/modules/auth'

import Panel from 'components/common/Panel'
import LoginForm from 'components/LoginForm'
import SignupForm from 'components/SignupForm'
import LoadingWrapper from 'components/common/LoadingWrapper'
import Button from 'components/common/Button'

import * as AuthActions from './actions'

function mapStateToProps(state, { location: { query } }) {
  const me = meSelector(state)
  const isLoggedIn = !R.isEmpty(me)
  return {
    query,
    loading: authLoadingSelector(state),
    loginModel: loginModelSelector(state),
    loginForm: loginFormSelector(state),
    signupModel: signupModelSelector(state),
    signupForm: signupFormSelector(state),
    isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return R.map(action => bindActionCreators(action, dispatch), AuthActions)
}

@translate('Auth')
@connect(mapStateToProps, mapDispatchToProps)
class Auth extends Component {

  componentDidMount() {
    const props = this.props
    if (props.isLoggedIn) {
      const next = props.location.query.next
      browserHistory.push(next ? next : '/')
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const props = nextProps
    if (props.isLoggedIn) {
      const next = props.location.query.next
      browserHistory.push(next ? next : '/')
    }
  }

  render() {
    const {
      strings,

      query,
      loading,
      loginModel,
      loginForm,
      signupModel,
      signupForm,

      onOutsideClick,
      onFacebookClick,
      LoginFormActions,
      SignupFormActions
      } = this.props

    return (
      <Panel
        className='auth bk-popin-login'
        onOutsideClick={onOutsideClick}
      >

        {query.next && query.next === '/event' && <h1 className='like-h1'>{strings.header}</h1>}

        <LoadingWrapper
          isLoading={loading}
          className='container collapsed'
        >
          <div className='login-form grid-6 grid-mobile-12'>
            <LoginForm
              model={loginModel}
              form={loginForm}
              {...LoginFormActions}
            />
            <Button
              data-max-rows='1'
              data-size='xlarge'
              data-show-faces='false'
              data-auto-logout-link='true'
              onClick={onFacebookClick}
            >Connect with Facebook</Button>
          </div>
          <div className='signup-form grid-6 grid-mobile-12'>
            <SignupForm
              model={signupModel}
              form={signupForm}
              {...SignupFormActions}
            />
          </div>
        </LoadingWrapper>
      </Panel>
    )
  }
}

export default Auth
