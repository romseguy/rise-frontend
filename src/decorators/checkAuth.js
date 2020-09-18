import { isEmpty } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { meSelector } from 'redux/modules/auth'

export default function checkAuth(Component) {

  function mapStateToProps(state) {
    const isLoggedIn = !isEmpty(meSelector(state))
    return {
      isLoggedIn
    }
  }

  @connect(mapStateToProps)
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth(this.props.isLoggedIn)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isLoggedIn)
    }

    checkAuth(isLoggedIn) {
      if (__CLIENT__ && !isLoggedIn) {
        let redirectAfterLogin = this.props.location.pathname
        browserHistory.push(`/login?next=${redirectAfterLogin}`)
      }
    }

    render() {
      return (
        <div>
          {this.props.isLoggedIn && <Component {...this.props}/>}
        </div>
      )
    }
  }

  return AuthenticatedComponent
}
