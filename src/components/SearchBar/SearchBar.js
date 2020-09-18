import './SearchBar.scss'

import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import enhanceWithClickOutside from 'react-click-outside'
import { contains } from 'ramda'
import Geosuggest from 'react-geosuggest'

@enhanceWithClickOutside
class SearchBar extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    onOutsideClick: PropTypes.func
  };

  handleClickOutside(e) {
    if (contains('top__search-button', e.target.classList)) {
      return
    }
    this.props.onOutsideClick()
  }

  render() {
    const { searchValue, searchButton, onSuggestSelect, onChange } = this.props
    return (
      <div className='search-bar'>
        <form id='search' className='shadow'>
          <Geosuggest
            autoFocus
            initialValue={searchValue}
            inputClassName='search-bar__input'
            type='text'
            onChange={onChange}
            onSuggestSelect={onSuggestSelect}
          />
          {searchButton}
        </form>
      </div>
    )
  }
}

export default SearchBar
