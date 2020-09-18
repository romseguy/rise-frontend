import './UserMenu.scss'

import React, { Component } from 'react'
import translate from 'decorators/translate'

import Dropdown, { Option } from 'components/common/Dropdown'

@translate('UserMenu')
class UserMenu extends Component {

  render() {
    const { strings, user, onLogoutClick } = this.props

    return (
      <div className='user-menu'>
        <Dropdown handler={(
          <Option>
            <div className='photo'>
              <img src={user.picture}/>
            </div>
            <span>{/*`${user.firstname} ${user.lastname}`*/user.username}</span>
          </Option>
        )}
        >
          <Option onClick={onLogoutClick}>
            {strings.logout}
          </Option>
        </Dropdown>
      </div>
    )
  }
}

export default UserMenu
