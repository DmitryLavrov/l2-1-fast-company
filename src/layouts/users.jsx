import React, { useEffect } from 'react'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { useParams } from 'react-router-dom'
import UserProvider from '../hooks/useUsers'
import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsersList } from '../store/users'

const Users = () => {
  const dispatch = useDispatch()
  const {userId} = useParams()
  const dataStatus = useSelector(getDataStatus())

  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsersList())
    }
  }, [])

  if (!dataStatus) {
    return <h1>Loading...</h1>
  }

  return (
    <UserProvider>
      {userId
        ? <UserPage userId={userId}/>
        : <UsersListPage/>
      }
    </UserProvider>
  )
}

export default Users
