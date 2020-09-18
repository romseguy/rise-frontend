import './DateTimePickerInput.scss'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import _DateTimePickerInput from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

@pure
class DateTimePickerInput extends Component {
  static propTypes = {

  };

  render() {
    const { value, placeholder, onChange } = this.props

    return (
      <div className='date-time-picker-input'>
        <_DateTimePickerInput
          value={value}
          onChange={onChange}
          inputProps={{placeholder}}
        />
      </div>
    )
  }
}

export default DateTimePickerInput
