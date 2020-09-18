import React, { Component } from 'react'
import pure from 'decorators/pure'

@pure
class Button extends Component {
  render() {
    const {children, link, ...props} = this.props

    if (link) {
      return (
        <a {...props}>{children}</a>
      )
    }

    return (
      <button {...props}>{children}</button>
    )
  }
}

export default Button
