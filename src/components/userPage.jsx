import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

import Qualities from './qualities'
import Bookmark from './bookmark'
import api from '../api'

const UserPage = ({userId}) => {
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    api.users.getById(userId).then(user => setUser(user))
  }, [])

  if (!user) return <h3>Loading....</h3>

  const handleButton = () => {
    history.push('/users')
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <div>
        <Qualities qualities={user.qualities}/>
      </div>
      <div>Встречи: {user.completedMeetings}</div>
      <h2>{`Оценка: ${user.rate} /5`}</h2>
      <div>
        <Bookmark status={user.bookmark}/>
      </div>
      <button type="button" className="btn btn-outline-secondary" onClick={handleButton}>Все пользователи</button>
    </>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
