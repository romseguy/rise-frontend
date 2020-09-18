/* global __CLIENT__:true */
import './Main.scss'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import translate from 'decorators/translate'
import R from 'ramda'

import { searchingSelector } from 'redux/modules/search'
import StreamsList from 'containers/StreamsList'

import Map from 'components/Map'
import Button from 'components/common/Button'

import * as MainActions from './actions'

const center = {
  latitude: 48.84877,
  longitude: 2.352683
}

function mapStateToProps(state) {
  const isSearching = searchingSelector(state)
  return {
    isSearching
  }
}

function mapDispatchToProps(dispatch) {
  return R.map(action => bindActionCreators(action, dispatch), MainActions)
}

@translate('Main')
@connect(mapStateToProps, mapDispatchToProps)
class Main extends Component {

  static contextTypes = {
    currentLanguage: PropTypes.string
  };

  render() {
    const {
      children, strings,
      CreateEventButtonActions,
      MapActions,
      isSearching
      } = this.props

    return (
      <main className='main page-content-wrapper'>

        {__CLIENT__ ? (
          <Map
            initialZoom={12}
            minZoom={3}
            maxZoom={20}
            {...center}
            {...MapActions}
          />
        ) : (
          <div id='map'/>
        )}

        {isSearching && (
          <div className='blur'></div>
        )}

        <StreamsList/>

        <a className='app-store' href='#'>
          <img src='/img/ico-app-store.png' alt="Disponible dans l'App Store"/>
        </a>

        <div className='main__children'>
          {children}
        </div>

        <Button
          className='btn-more shadow'
          {...CreateEventButtonActions}
        >
          {strings.createEvent}
          <i className='icon-croix'/>
        </Button>
      </main>
    )
  }
}

export default Main
