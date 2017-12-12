//
// bind reducer and store
//
'use strict'
import { combineReducers, createStore } from 'redux'
import {reducer} from './reducer'

const initialState = {
  node: {
    X: {
      point: { x: 130, y: 50 },
      netifs: [
        { connect : "link_0" }
      ]
    },
    Y: {
      point: { x: 230, y: 150 },
      netifs: [
        { connect : "link_0" }
      ]
    },
    Z: {
      point: { x: 330, y: 250 },
      netifs: [
        { connect : "link_0" }
      ]
    }
  },
  channel: {
    link_0: {
      point: { x: 30, y: 50 },
      type: "PointToPoint",
      config: {
        Delay : "2ms",
        DataRate : "3Mbps"
      }
    }
  },
  line: {}
}

export const store = createStore(reducer, initialState)
