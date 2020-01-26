//
// bind reducer and store
//
'use strict'
import { combineReducers, createStore } from 'redux'
import { projectReducer, errorMessageReducer, netReducer, guiReducer } from './reducer'
import { initialState } from './default-states'

export const store = createStore(
  combineReducers({
    projectState: projectReducer,
    errorState: errorMessageReducer,
    netState: netReducer,
    guiState: guiReducer
  }),
  initialState
)
