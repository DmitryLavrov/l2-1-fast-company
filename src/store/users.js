import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'

const initialState = {
  entities: null,
  isLoading: true,
  error: null
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
    }
  }
})

const {usersRequested, usersReceived, usersRequestFailed} = usersSlice.actions

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
      const {content} = await userService.get()
      dispatch(usersReceived(content))
    } catch (err) {
      dispatch(usersRequestFailed(err.message))
    }
}

export const getUsersList = () => state => state.users.entities

export const getUserById = (id) => state => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === id)
  }
  return {}
}

const {reducer: usersReducer} = usersSlice

export default usersReducer
