import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualities'
import professionsReducer from './professions'

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer
})

function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}

export default createStore
