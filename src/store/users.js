import { createSlice, createAction } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import randomInt from '../utils/randomInt'
import history from '../utils/history'
import { toast } from 'react-toastify'

const initialState = localStorageService.getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: {userId: localStorageService.getUserId()},
    isLoggedIn: true,
    dataLoaded: false
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested(state) {
      state.isLoading = true
    },
    usersReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
      state.dataLoaded = true
    },
    usersRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
      toast.info(state.error)
    },
    authRequestSuccess(state, action) {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed(state, action) {
      state.error = action.payload
      toast.info(state.error)
    },
    userCreated(state, action) {
      state.entities.push(action.payload)
    },
    userUpdated(state, action) {
      const idx = state.entities.findIndex(i => i._id === localStorageService.getUserId())
      state.entities[idx] = {...state.entities[idx], ...action.payload}
    },
    userLoggedOut(state) {
      state.entities = null
      state.auth = null
      state.isLoggedIn = false
      state.dataLoaded = false
    }
  }
})

const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userUpdated,
  userLoggedOut
} = usersSlice.actions

// for APP.JS and USERS.JSX or APPLOADER.JSX and USERSLOADER.JSX
export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const {content} = await userService.get()
    dispatch(usersReceived(content))
  } catch (err) {
    dispatch(usersRequestFailed(err.message))
  }
}

// AUTH
const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFailed = createAction('users/userCreateFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const signUp = ({email, password, ...rest}) => async dispatch => {
  dispatch(authRequested())
  try {
    const data = await authService.register({email, password})
    localStorageService.setToken(data)
    dispatch(authRequestSuccess({
      userId: data.localId
    }))
    dispatch(createUser({
      _id: data.localId,
      email,
      rate: randomInt(1, 5),
      completedMeetings: randomInt(0, 200),
      image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
      ...rest
    }))
  } catch (err) {
    dispatch(authRequestFailed(err.message))
  }
}

export const login = ({payload, redirect}) => async dispatch => {
  const {email, password} = payload
  dispatch(authRequested())
  try {
    const data = await authService.login({email, password})
    localStorageService.setToken(data)
    dispatch(authRequestSuccess({
      userId: data.localId
    }))
    history.push(redirect)
  } catch (err) {
    dispatch(authRequestFailed(err.message))
  }
}

export const logout = () => async dispatch => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

export const updateUserData = (payload) => async dispatch => {
  const {email, password} = payload
  dispatch(authRequested())
  try {
    const data = await authService.updateAccounts(email, password)
    localStorageService.setToken(data)
    dispatch(authRequestSuccess({
      userId: data.localId
    }))

    const newData = {...payload}
    delete newData.password
    dispatch(updateUser(data.localId, newData))
  } catch (err) {
    dispatch(authRequestFailed(err.message))
  }
}

function createUser(payload) {
  return async dispatch => {
    dispatch(userCreateRequested())
    try {
      const {content} = await userService.create(payload)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (err) {
      dispatch(userCreateFailed(err.message))
    }
  }
}

function updateUser(id, payload) {
  return async dispatch => {
    dispatch(userUpdateRequested())
    try {
      const {content} = await userService.update(id, payload)
      dispatch(userUpdated(content))
      history.push(`/users/${id}`)
    } catch (err) {
      dispatch(userUpdateFailed(err.message))
    }
  }
}

// SELECTORS
export const getUsersList = () => state => state.users.entities

export const getUserById = (id) => state => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === id)
  }
  return {}
}

export const getIsLoggedIn = () => state => state.users.isLoggedIn

export const getDataStatus = () => state => state.users.dataLoaded

export const getCurrentUserId = () => state => state.users.auth.userId

export const getCurrentUserData = () => state => state.users.entities
  ? state.users.entities.find(u => u._id === state.users.auth.userId)
  : null

export const getUsersLoadingStatus = () => state => state.users.isLoading

const {reducer: usersReducer} = usersSlice

export default usersReducer
