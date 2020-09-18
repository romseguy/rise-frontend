import 'react-date-picker/base.css'

import './DatePicker.scss'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import _DatePicker from 'react-date-picker'

@pure
class DatePicker extends Component {
  static propTypes = {};

  render() {
    const { date, onChange } = this.props

    return (
      <div className='date-picker'>
        <_DatePicker
          date={date}
          onChange={onChange}
        />
      </div>
    )
  }
}

export default DatePicker
