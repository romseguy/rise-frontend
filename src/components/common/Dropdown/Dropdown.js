import './Dropdown.scss'
import React, { Component, PropTypes } from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import pure from 'decorators/pure'
import cx from 'classnames'
import Button from 'components/common/Button'

@pure
class Handler extends Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  render() {
    const { children, onClick } = this.props

    return (
      <Button
        className='dropdown__handler user'
        onClick={onClick}
      >
        {children}
      </Button>
    )
  }
}

@pure
class Options extends Component {
  static propTypes = {};

  render() {
    const { children, visible } = this.props

    const className = cx('dropdown__options', {
      'dropdown__options--visible': visible
    })

    return (
      <div className={className}>
        {children}
      </div>
    )
  }
}

@pure
export class Option extends Component {
  static propTypes = {
    handleClick: PropTypes.func,
    disabled: PropTypes.bool
  };

  render() {
    const { children, onClick  } = this.props

    return (
      <div
        className='dropdown__option'
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
}

@pure
@enhanceWithClickOutside
export default class Dropdown extends Component {
  state = {
    visible: false
  };

  toggle() {
    this.setState({
      visible: !this.state.visible
    })
  }

  hide() {
    this.setState({
      visible: false
    })
  }

  handleHandlerClick() {
    this.toggle()
  }

  handleClickOutside() {
    this.hide()
  }

  render() {
    const {children, handler, ...props} = this.props

    return (
      <div {...props}
        className='dropdown'
      >
        <Handler onClick={::this.handleHandlerClick}>
          {handler}
          <i className='icon-fleche'/>
        </Handler>
        <Options visible={this.state.visible}>
          {children}
        </Options>
      </div>
    )
  }
}
