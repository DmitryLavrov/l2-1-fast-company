import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'
import isOutdated from '../utils/isOutdated'

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
  lastFetch: null
}

const professionsSlice = createSlice({
  name: 'professions',
  initialState,
  reducers: {
    professionsRequested(state) {
      state.isLoading = true
    },
    professionsReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
      state.lastFetch = Date.now()
    },
    professionsRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const {professionsRequested, professionsReceived, professionsRequestFailed} = professionsSlice.actions

export const loadProfessionsList = () => async (dispatch, state) => {
  if (isOutdated(state().professions.lastFetch)) {
    dispatch(professionsRequested())
    try {
      const {content} = await professionService.get()
      dispatch(professionsReceived(content))
    } catch (err) {
      dispatch(professionsRequestFailed(err.message))
    }
  }
}

export const getProfessionsList = () => state => state.professions.entities
export const getProfessionsLoadingStatus = () => state => state.professions.isLoading
export const getProfessionById = (id) => state => {
  if (state.professions.entities) {
    return state.professions.entities.find(p => (p._id === id))
  }
  return {}
}

const {reducer: professionsReducer} = professionsSlice

export default professionsReducer
