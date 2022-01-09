import React from 'react'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { useParams } from 'react-router-dom'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
  const {userId} = useParams()

  return (
    <UsersLoader>
      {userId
        ? <UserPage userId={userId}/>
        : <UsersListPage/>
      }
    </UsersLoader>
  )
}

export default Users
