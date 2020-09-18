import './SearchButton.scss'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import Button from 'components/common/Button'
import translate from 'decorators/translate'
import cx from 'classnames'

@pure
@translate('SearchButton')
class SearchButton extends Component {
  static propTypes = {};

  handleClick(e) {
    e.preventDefault()
    this.props.onClick && this.props.onClick()
  }

  render() {
    const { strings, link } = this.props

    return (
      <Button
        className={cx('search-button', {
          'btn-search': link !== undefined
        })}
        type='submit'
        onClick={::this.handleClick}
        link={link}
      >
        {strings.search}
        <i className='icon-recherche'/>
      </Button>
    )
  }
}

export default SearchButton
