import { createSlice, createAction } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'

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
      state.auth = {...action.payload, isLoggedIn: true}
    },
    authRequestFailed(state, action) {
      state.error = action.payload
    }
  }
})

const {usersRequested, usersReceived, usersRequestFailed, authRequestSuccess, authRequestFailed} = usersSlice.actions

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

export const signUp = ({email, password, ...rest}) => async dispatch => {
  dispatch(authRequested())
  try {
  const data = await authService.register({email, password})
    localStorageService.setToken(data)
    dispatch(authRequestSuccess({
      userId: data.localId
    }))
  } catch (err) {
    dispatch(authRequestFailed(err.message))
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

const {reducer: usersReducer} = usersSlice

export default usersReducer
