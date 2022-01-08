import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
// import { useAuth } from './useAuth'

const UserContext = React.createContext()

export const useUser = () => useContext(UserContext)

const UserProvider = ({children}) => {
  const [users, setUsers] = useState([])
  // const {currentUser} = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  // useEffect(() => {
  //   if (!isLoading) {
  //     // =========================
  //     console.log('users:', users)
  //     console.log(':currentUser', currentUser)
  //     // =========================
  //     const newUsers = [...users].map(u => (u._id === currentUser._id ? currentUser : u))
  //     setUsers(newUsers)
  //   }
  // }, [currentUser])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  async function getUsers() {
    try {
      const {content} = await userService.get()
      setUsers(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function getUserById(id) {
    return users.find(user => user._id === id)
  }

  function errorCatcher(err) {
    setError(err.response?.data?.error?.message || err.message)
    setIsLoading(false)
  }

  return (
    <UserContext.Provider value={{users, getUserById}}>
      {isLoading
        ? 'Loading...'
        : children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UserProvider
