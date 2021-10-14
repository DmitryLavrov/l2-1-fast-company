import React from 'react'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import {useParams} from 'react-router-dom'

const Users = () => {
  const {userId} = useParams()

  return (
    <>
      {userId
        ? <UserPage userId={userId}/>
        : <UsersListPage/>
      }
    </>
  )
}

export default Users
