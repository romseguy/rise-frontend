import './Panel.scss'
import cx from 'classnames'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import enhanceWithClickOutside from 'react-click-outside'
import { contains } from 'ramda'

@enhanceWithClickOutside
@pure
class Panel extends Component {
  static propTypes = {};

  handleClickOutside(e) {
    if (contains('noOutsideClick', e.target.classList)) {
      return
    }
    this.props.onOutsideClick && this.props.onOutsideClick(e)
  }

  render() {
    const { children, className, ...props } = this.props
    const classes = cx('panel', className)

    return (
      <div {...props}
        className={classes}
      >
        {children}
      </div>
    )
  }
}

export default Panel
