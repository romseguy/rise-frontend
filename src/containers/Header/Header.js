import './Header.scss'

import { map, isEmpty } from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import translate from 'decorators/translate'
import { meSelector } from 'redux/modules/auth'
import UserMenu from 'containers/UserMenu'
import StreamsFilter from 'containers/StreamsFilter'
import NewsfeedFilter from 'containers/NewsfeedFilter'

import {
  visibleSelector as newsfeedVisibleSelector,
} from 'redux/modules/newsfeed'
import { streamFilterSelector } from 'redux/modules/streams'

import { searchingSelector, searchValueSelector } from 'redux/modules/search'

import SearchBar from 'components/SearchBar'

import Button from 'components/common/Button'
import SearchButton from 'components/SearchButton'

import * as HeaderActions from './actions'

function mapStateToProps(state) {
  const me = meSelector(state)
  const isNewsfeedVisible = newsfeedVisibleSelector(state)

  const isSearching = searchingSelector(state)
  const searchValue = searchValueSelector(state)

  return {
    me,
    isLoggedIn: !isEmpty(me),
    isNewsfeedVisible,
    isSearching,
    searchValue
  }
}

function mapDispatchToProps(dispatch) {
  return map(action => bindActionCreators(action, dispatch), HeaderActions)
}

@translate('Header')
@connect(mapStateToProps, mapDispatchToProps)
class Header extends Component {

  render() {
    const {
      strings,
      me,

      isNewsfeedVisible,
      NewsfeedButtonActions,

      SigninButtonActions,
      UserMenuActions,

      SearchActions,
      SearchBarActions,
      searchValue,
      isSearching,
      isLoggedIn
      } = this.props

    return (
      <header
        role='banner'
        className='header page-header-wrapper'
      >
        <div className='site-content'>

          <Button
            className='logo'
            link
          >
            <img src='/img/logo.png'/>
          </Button>

          <div className='wrapper-nav'>
            {isSearching ? (
              <SearchBar
                searchValue={searchValue}
                searchButton={<SearchButton onClick={SearchActions.onSearchClick}/>}
                {...SearchBarActions}
                onSuggestSelect={suggest => (SearchBarActions.onSuggestSelect(suggest), SearchBarActions.onChange(suggest.label))}
              />
            ) : (
              <div>
                {isNewsfeedVisible ? (
                  <NewsfeedFilter/>
                ) : (
                  <StreamsFilter/>
                )}
                <SearchButton
                  onClick={SearchActions.onSearchClick}
                  link
                />
              </div>
            )}

            {isLoggedIn && (
              <Button
                className='main__newsfeed-button news'
                {...NewsfeedButtonActions}
              >
                <i className='icon-newsfeed'/>
                <div>{strings.newsfeed}</div>
                {/*TODO: {<span>notificationCount</span>}*/}
              </Button>
            )}

            {isLoggedIn ? (
              <UserMenu
                user={me}
                {...UserMenuActions}
              />
            ) : (
              <Button
                className='main__signin-button user'
                {...SigninButtonActions}
              >
                <span>{strings.signIn}</span>
              </Button>
            )}
          </div>
        </div>
      </header>
    )
  }
}

export default Header
