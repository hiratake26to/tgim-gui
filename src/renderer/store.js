//
// bind reducer and store
//
'use strict'
import { combineReducers, createStore } from 'redux'
import { netReducer, guiReducer } from './reducer'

const initialState = {
  netState: {
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
    "apps" : {
      "tcp_app" : {
        "type": "setMyTcpApp",
        "args": {
          "src": { "host": "X", "port": 60000 },
          "dst": { "host": "Y", "port": 80 },
          "sim": { "start": 5, "stop": 25 },
          "opt": { "rate": "1Mbps" }
        }
      }
    }
  },
  guiState: {
    line: {},
    editor: {}
  }
}

export const store = createStore(
  combineReducers({netState: netReducer, guiState: guiReducer}),
  initialState
)
