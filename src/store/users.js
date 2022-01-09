import { createSlice, createAction } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import randomInt from '../utils/randomInt'
import history from '../utils/history'

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
  auth: null,
  isLoggedIn: false
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
    },
    usersRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess(state, action) {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed(state, action) {
      state.error = action.payload
    },
    userCreated(state, action) {
      state.entities.push(action.payload)
    }
  }
})

const {usersRequested, usersReceived, usersRequestFailed, authRequestSuccess, authRequestFailed, userCreated} = usersSlice.actions

// for APP.JS
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
const createUserFailed = createAction('users/createUserFailed')

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

function createUser(payload) {
  return async dispatch => {
    dispatch(userCreateRequested())
    try {
      const {content} = await userService.create(payload)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (err) {
      dispatch(createUserFailed(err.message))
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

const {reducer: usersReducer} = usersSlice

export default usersReducer
