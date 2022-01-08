import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
  lastFetch: null
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
      state.lastFetch = Date.now()
    },
    qualitiesRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const {qualitiesRequested, qualitiesReceived, qualitiesRequestFailed} = qualitiesSlice.actions

function isOutdated(date) {
  if (Date.now() > (date + 10 * 60 * 1000)) {
    return true
  }
  return false
}

export const loadQualitiesList = () => async (dispatch, state) => {
  if (isOutdated(state().qualities.lastFetch)) {
    dispatch(qualitiesRequested())
    try {
      const {content} = await qualityService.get()
      dispatch(qualitiesReceived(content))
    } catch (err) {
      dispatch(qualitiesRequestFailed(err.message))
    }
  }
}

export const getQualities = () => state => state.qualities.entities
export const getQualitiesLoadingStatus = () => state => state.qualities.isLoading

const {reducer: qualitiesReducer} = qualitiesSlice

export default qualitiesReducer
