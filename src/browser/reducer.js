'use strict'
import {handleActions} from 'redux-actions'
import {
  addNode, moveNode, assignNode,
  addChannel, moveChannel, assignChannel,
  addLine, delLine
} from './action'

const defaultNodeProp = {
  point: { x: 100, y: 100 },
  netifs: []
}

const defaultChannelProp = {
  point: { x: 50, y: 50 },
  type: "PointToPoint",
  config: {
    Delay : "1ms",
    DataRate : "100Mbps"
  }
}

const defaultLineProp = {
  first: {
    type: undefined, // 'NODE' or 'CHANNEL'
    id: undefined
  },
  second: {
    type: undefined,
    id: undefined
  }
}

export const reducer = handleActions({
  [addNode]: (state, { payload: { id }}) => {
    return {
      ...state,
      node: {
        ...state.node,
        [id]: {
          ...state.node[id],
          ...defaultNodeProp
        }
      }
    }
  },
  [moveNode]: (state, { payload: { id, point: [x,y] }}) => {
    return {
      ...state,
      node: {
        ...state.node,
        [id]: {
          ...state.node[id],
          point: {
            x: x,
            y: y
          }
        }
      }
    }
  },
  [assignNode]: (state, { payload: { id, prop: prop }}) => {
    return {
      ...state,
      node: {
        ...state.node,
        [id]: {
          ...state.node[id],
          ...prop
        }
      }
    }
  },
  [addChannel]: (state, { payload: { id }}) => {
    return {
      ...state,
      channel: {
        ...state.channel,
        [id]: {
          ...state.channel[id],
          ...defaultChannelProp
        }
      }
    }
  },
  [moveChannel]: (state, { payload: { id, point: [x,y] }}) => {
    return {
      ...state,
      channel: {
        ...state.channel,
        [id]: {
          ...state.channel[id],
          point: {
            x: x,
            y: y
          }
        }
      }
    }
  },
  [assignChannel]: (state, { payload: { id, prop: prop }}) => {
    return {
      ...state,
      channel: {
        ...state.channel,
        [id]: {
          ...state.channel[id],
          ...prop
        }
      }
    }
  },
  [addLine]: (state, { payload: { id, first: f, second: s }}) => {
    return {
      ...state,
      line: {
        ...state.line,
        [id]: {
          ...state.line[id],
          first: f,
          second: s
        }
      }
    }
  },
  [delLine]: (state, { payload: { id }}) => {
    if (!state.line || !state.line[id] ) return state
    delete state.line[id]
    return { ...state }
  }
}, null)
