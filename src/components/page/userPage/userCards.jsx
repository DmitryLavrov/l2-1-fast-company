import React from 'react'
import PropTypes from 'prop-types'

import UserCardInfo from './userCardInfo'
import UserCardQualities from './userCardQualities'
import UserCardMeetings from './userCardMeetings'

const UserCards = ({user, onClickButton}) => {
  return (
    <div className="col-md-4 mb-3">
      <UserCardInfo name={user.name} profession={user.profession.name} rate={user.rate} onClickButton={onClickButton}/>

      <UserCardQualities qualities={user.qualities}/>

      <UserCardMeetings completedMeetings={user.completedMeetings}/>
    </div>
  )
}

UserCards.propTypes = {
  user: PropTypes.object,
  onClickButton: PropTypes.func
}

export default UserCards
