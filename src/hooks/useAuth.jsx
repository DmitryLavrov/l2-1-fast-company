import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.resvice'
import { toast } from 'react-toastify'
import localStorageService from '../services/localStorage.service'

const httpAuth = axios.create()

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  async function singUp({email, password, ...rest}) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_FIREBASE_KEY
// =========================
    console.log('process.env:', process.env)
// =========================
    try {
      const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true})
      localStorageService.setToken(data)
      await createUser({_id: data.localId, email, ...rest})
    } catch (err) {
      errorCatcher(err)
      const {code, message} = err.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким EMAIL уже существует'
          }
          throw errorObject
        }
      }
      // =========================
      console.log('err.response.data.error:', err.response.data.error)
      // =========================
    }
  }

  async function singIn({email, password, ...rest}) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_FIREBASE_KEY

    try {
      const {data} = await httpAuth.post(url, {email, password, returnSecureToken: true})
      localStorageService.setToken(data)
      await getUser(data.localId)
      // =========================
      console.log('currentUser:', currentUser)
      console.log('currentUser:', currentUser._id)
      console.log('currentUser:', currentUser.email)
      console.log('currentUser:', currentUser.profession)
      console.log('currentUser:', currentUser.qualities)
      // =========================
    } catch (err) {
      errorCatcher(err)
      const {code, message} = err.response.data.error
      if (code === 400) {
        if (message === 'INVALID_PASSWORD') {
          const errorObject = {
            password: 'Неверный пароль'
          }
          throw errorObject
        } else if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = {
            email: 'Пользователь с таким EMAIL не найден'
          }
          throw errorObject
        }
      }
      // =========================
      console.log('err.response.data.error:', err.response.data.error)
      // =========================
    }
  }

  async function createUser(data) {
    try {
      const {content} = await userService.create(data)
      setCurrentUser(content)
    } catch (err) {
      errorCatcher(err)
    }
  }

  async function getUser(id) {
    try {
      const {content} = await userService.getById(id)
      setCurrentUser(content)
    } catch (err) {
      errorCatcher(err)
    }
  }

  function errorCatcher(err) {
    setError(err.response?.data?.message && err.message)
  }

  return (
    <AuthContext.Provider value={{singUp, singIn, currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider
