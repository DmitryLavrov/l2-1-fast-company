import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'

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
      const {content} = await qualityService.get()
      dispatch(usersReceived(content))
    } catch (err) {
      dispatch(usersRequestFailed(err.message))
    }
}

// export const getUsers = () => state => state.users.entities
// export const getUsersLoadingStatus = () => state => state.users.isLoading

const {reducer: usersReducer} = usersSlice

export default usersReducer
