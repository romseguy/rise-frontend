import './LoadingWrapper.scss'
import React, { Component } from 'react'
import pure from 'decorators/pure'
import cx from 'classnames'

@pure
class LoadingWrapper extends Component {
  render() {
    const {children, isLoading, className, ...props} = this.props
    const classes = cx('loading-wrapper', className)

    return (
      <div {...props}
        className={classes}
      >{isLoading ? 'Loading...' : children}</div>
    )
  }
}

export default LoadingWrapper
