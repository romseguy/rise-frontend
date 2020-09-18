import './App.scss'
import 'tg-modal/dist/default.scss'

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { GatewayProvider, GatewayDest } from 'react-gateway'
import Modal from 'tg-modal'
import { isEmpty } from 'ramda'

import types from 'redux/types'
import { OneTimeUserError } from 'redux/errors'
import { currentLanguageSelector } from 'redux/modules/i18n'
import { latestOneTimeErrorSelector } from 'redux/modules/errorLog'

import Header from 'containers/Header'
import Footer from 'containers/Footer'

function mapStateToProps(state) {
  return {
    currentLanguage: currentLanguageSelector(state),
    latestOneTimeError: latestOneTimeErrorSelector(state).toJS()
  }
}

@connect(mapStateToProps)
class App extends Component {

  static childContextTypes = {
    currentLanguage: React.PropTypes.string.isRequired
  };

  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  toggleModal() {
    this.props.dispatch({type: types.UI_ERROR_MODAL_CLOSED})
  }

  getModalTitle(err) {
    if (err instanceof OneTimeUserError) {
      return ''
    }

    return 'Oops, something went wrong...'
  }

  render() {
    const { children, latestOneTimeError } = this.props

    return (
      <div>
        <GatewayProvider>
          <div className='app'>
            <Header/>
            {children}
            <GatewayDest name='modal'/>
            <Footer/>
          </div>
        </GatewayProvider>
        <Modal
          isOpen={!isEmpty(latestOneTimeError)}
          title={::this.getModalTitle(latestOneTimeError)}
          isStatic
          className='noOutsideClick'
        >
          <Modal.Body>
            <p>{latestOneTimeError.message}.</p>
            {latestOneTimeError.cause instanceof OneTimeUserError && (
              <p>{latestOneTimeError.cause.message}.</p>
            )}
          </Modal.Body>

          <div className='modal-footer'>
            <a className='btn btn-primary' onClick={::this.toggleModal}>Close</a>
          </div>
        </Modal>
      </div>
    )
  }
}

export default App
