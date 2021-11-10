import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.resvice'
import { toast } from 'react-toastify'

const UserContext = React.createContext()

export const useUser = () => useContext(UserContext)

const UserProvider = ({children}) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

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

  function errorCatcher(error) {
    setError(error.response.data.message)
    setIsLoading(false)
  }

  return (
    <UserContext.Provider value={{users}}>
      {isLoading
        ? 'Loading'
        : children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UserProvider
