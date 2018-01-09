//
// bind reducer and store
//
'use strict'
import { combineReducers, createStore } from 'redux'
import { netReducer, guiReducer } from './reducer'
import { initialState } from './default-states'

export const store = createStore(
  combineReducers({netState: netReducer, guiState: guiReducer}),
  initialState
)
