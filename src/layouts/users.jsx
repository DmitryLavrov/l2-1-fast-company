import React from 'react'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { useParams } from 'react-router-dom'
import UserProvider from '../hooks/useUsers'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
  const {userId} = useParams()

  return (
    <UsersLoader>
      <UserProvider>
        {userId
          ? <UserPage userId={userId}/>
          : <UsersListPage/>
        }
      </UserProvider>
    </UsersLoader>
  )
}

export default Users
