import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  entities: null,
  isLoading: true
}

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState
})

const {reducer: qualitiesReducer} = qualitiesSlice

export default qualitiesReducer
