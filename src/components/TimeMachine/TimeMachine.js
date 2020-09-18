import './TimeMachine.scss'
import cx from 'classnames'
import React, { Component, PropTypes } from 'react'
import pure from 'decorators/pure'
import translate from 'decorators/translate'
import Button from 'components/common/Button'

@translate('TimeMachine')
@pure
class TimeMachine extends Component {
  static propTypes = {
    strings: PropTypes.object,
    onPastClick: PropTypes.func,
    onLiveClick: PropTypes.func,
    onUpcomingClick: PropTypes.func
  };

  handlePastClick() {
    this.props.onPastClick()
  }

  handleLiveClick() {
    this.props.onLiveClick()
  }

  handleUpcomingClick() {
    this.props.onUpcomingClick()
  }

  render() {
    const { strings, active, className } = this.props

    return (
      <nav
        role='navigation'
        className={cx('time-machine', className)}
      >
        <ul className='no-list'>
          <li>
            <Button
              className={cx('time-machine__past noOutsideClick', {
                'time-machine__past--active': active === 'past'
              })}
              onClick={::this.handlePastClick}
              link
            >
              {strings.past}
              <i className='icon-fleche noOutsideClick'/>
            </Button>
          </li>
          <li>
            <Button
              className={cx('time-machine__live noOutsideClick', {
                'time-machine__live--active': active === 'live'
              })}
              onClick={::this.handleLiveClick}
              link
            >
              {strings.live}
            </Button>
          </li>
          <li>
            <Button
              className={cx('time-machine__upcoming noOutsideClick', {
                'time-machine__upcoming--active': active === 'upcoming'
              })}
              onClick={::this.handleUpcomingClick}
              link
            >
              {strings.upcoming}
            </Button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default TimeMachine
