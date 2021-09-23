import React from 'react'

import UsersList from '../components/usersList'
import UserPage from '../components/userPage'
import {useParams} from 'react-router-dom'

const Users = () => {
  const {userId} = useParams()

  return (
    <>
      {userId
        ? <UserPage userId={userId}/>
        : <UsersList/>
      }
    </>
  )
}

export default Users
