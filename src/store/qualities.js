import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'

const initialState = {
  entities: null,
  isLoading: true,
  error: null
}

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState,
  reducers: {
    qualitiesRequested(state) {
      state.isLoading = true
    },
    qualitiesReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    qualitiesRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const {qualitiesRequested, qualitiesReceived, qualitiesRequestFailed} = qualitiesSlice.actions

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested())
  try {
    const {content} = await qualityService.get()
    dispatch(qualitiesReceived(content))
  } catch (err) {
    dispatch(qualitiesRequestFailed(err.message))
  }
}

const {reducer: qualitiesReducer} = qualitiesSlice

export default qualitiesReducer
