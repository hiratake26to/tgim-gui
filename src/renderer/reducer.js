/* vim:set foldmethod=marker: */
'use strict'
import {handleActions} from 'redux-actions'
import * as Act from './action'
import * as ModelLoader from '../model/loader'
import {
  defaultNetState,
  defaultGuiState,
  defaultNodeProp,
  defaultSubnetProp,
  defaultChannelProp,
  defaultLineProp,
  defaultAppProp
} from './default-states'

import {mixinGetHelper} from './helper'

//////////////////////////////////////////////////
// GUI Reducer
// {{{

export const guiReducer = handleActions({
  [Act.initAllState]: (state) => {
    return defaultGuiState
  },

  [Act.addLine]: (state, { payload: { id, first: f, second: s }}) => {
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
  [Act.delLine]: (state, { payload: { id }}) => {
    if (!state.line || !state.line[id] ) return state
    delete state.line[id]
    return { 
      ...state,
      line: {
        ...state.line
      }
    }
  },
  [Act.showProps]: (state, { payload: { type, id }}) => {
    return {
      ...state,
      editor: {
        visible: true,
        type: type,
        id: id
      }
    }
  },
  [Act.hideProps]: (state) => {
    return {
      ...state,
      editor: {
        ...state.editor,
        visible: false
      }
    }
  },
  [Act.changeWorkDir]: (state, { payload: { path }}) => {
    return {
      ...state,
      work_dir: path
    }
  },

  // ノードが消されるときに関連するライン情報も削除する
  [Act.delNode]: (state, { payload: { id }}) => {
    let deleted = []
    Object.keys(state.line).forEach( (lkey) => {
      const l = state.line[lkey]
      if ( l.first.type === 'NODE' && l.first.id === id
        || l.second.type === 'NODE' && l.second.id === id
      ) {
        deleted.push(lkey)
      }
    })
    deleted.forEach((id) => {
      guiReducer(state, Act.delLine(id))
    })
    return state
  },
  // Subnetが消されるときに関連するライン情報も削除する
  [Act.delSubnet]: (state, { payload: { id }}) => {
    let deleted = []
    Object.keys(state.line).forEach( (lkey) => {
      const l = state.line[lkey]
      if ( l.first.type === 'SUBNET' && l.first.id === id
        || l.second.type === 'SUBNET' && l.second.id === id
      ) {
        deleted.push(lkey)
      }
    })
    deleted.forEach((id) => {
      guiReducer(state, Act.delLine(id))
    })
    return state
  },

  [Act.selectWithinRectangle]: (state, { payload: rectangle}) => {
    return {
      ...state,
      selector: {
        ...state.selector,
        type: 'RECTANGLE',
        value: rectangle,
      }
    }
  }
}, null)

// GUI Reducer
// }}}

//////////////////////////////////////////////////
// Net Reducer
// {{{

export const netReducer = handleActions({
  [Act.initAllState]: (state) => {
    return defaultNetState
  },
  [Act.setNetState]: (state, { payload: newState }) => {
    console.log('set new state of net!')
    console.log(newState)
    return {
      ...state,
      ...newState
    }
  },

  [Act.addNode]: (state, { payload: { id }}) => {
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
  [Act.addNodeAuto]: (state, { payload: { prefix }}) => {
    const tmp_node_subnet = mixinGetHelper(Object.assign({}, state.node, state.subnet))

    // getLastIdx return -1 if no node has prefix,
    // therefor, first node id is 0 (= (-1) + 1)
    const id = `${prefix}${tmp_node_subnet.getLastIdx(prefix)+1}`
    
    const next = netReducer(state, Act.addNode(id))
    return next
  },
  [Act.delNode]: (state, { payload: { id }}) => {
    delete state.node[id]
    return { 
      ...state,
      node: {
        ...state.node
      }
    }
  },
  [Act.copyNode]: (state, { payload: { id, newid }}) => {
    return {
      ...state,
      node: {
        ...state.node,
        [newid]: {
          ...state.node[id]
        }
      }
    }
  },
  [Act.moveNode]: (state, { payload: { id, point: [x,y] }}) => {
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
  [Act.assignNode]: (state, { payload: { id, prop: prop }}) => {
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
  [Act.addNodeNetif]: (state, { payload: { id, prop }}) => {
    netifs = state.node.netifs
    netifs.push(prop)
    return {
      ...state,
      node: {
        ...state.node,
        [id]: {
          ...state.node[id],
          netifs
        }
      }
    }
  },
  [Act.delNodeNetif]: (state, { payload: { id, index }}) => {
    netifs = state.node.netifs
    netifs.splice(index, 1)
    return {
      ...state,
      node: {
        ...state.node,
        [id]: {
          ...state.node[id],
          netifs
        }
      }
    }
  },
  [Act.assignNodeNetif]: (state, { payload: { id, netifs }}) => {
    return {
      ...state,
      node: {
        ...state.node,
        [id]: {
          ...state.node[id],
          netifs: netifs
        }
      }
    }
  },

  [Act.addSubnet]: (state, { payload: { id }}) => {
    return {
      ...state,
      subnet: {
        ...state.subnet,
        [id]: {
          ...state.subnet[id],
          ...defaultSubnetProp
        }
      }
    }
  },
  [Act.addSubnetAuto]: (state, { payload: { prefix }}) => {
    const tmp_node_subnet = mixinGetHelper(Object.assign({}, state.node, state.subnet))
    const id = `${prefix}${tmp_node_subnet.getLastIdx(prefix)+1}`
    return netReducer(state, Act.addSubnet(id))
  },
  [Act.delSubnet]: (state, { payload: { id }}) => {
    delete state.subnet[id]
    return { 
      ...state,
      subnet: {
        ...state.subnet
      }
    }
  },
  [Act.moveSubnet]: (state, { payload: { id, point: [x,y] }}) => {
    return {
      ...state,
      subnet: {
        ...state.subnet,
        [id]: {
          ...state.subnet[id],
          point: {
            x: x,
            y: y
          }
        }
      }
    }
  },
  [Act.assignSubnet]: (state, { payload: { id, prop: prop }}) => {
    return {
      ...state,
      subnet: {
        ...state.subnet,
        [id]: {
          ...state.subnet[id],
          ...prop
        }
      }
    }
  },
  [Act.addSubnetNetif]: (state, { payload: { id, prop }}) => {
    netifs = state.subnet.netifs
    netifs.push(prop)
    return {
      ...state,
      subnet: {
        ...state.subnet,
        [id]: {
          ...state.subnet[id],
          netifs
        }
      }
    }
  },
  [Act.delSubnetNetif]: (state, { payload: { id, index }}) => {
    netifs = state.subnet.netifs
    netifs.splice(index, 1)
    return {
      ...state,
      subnet: {
        ...state.subnet,
        [id]: {
          ...state.subnet[id],
          netifs
        }
      }
    }
  },
  [Act.assignSubnetNetif]: (state, { payload: { id, netifs }}) => {
    return {
      ...state,
      subnet: {
        ...state.subnet,
        [id]: {
          ...state.subnet[id],
          netifs: netifs
        }
      }
    }
  },

  [Act.addChannel]: (state, { payload: { id, type }}) => {
    return {
      ...state,
      channel: {
        ...state.channel,
        [id]: {
          ...state.channel[id],
          ...defaultChannelProp,
          type: type
        }
      }
    }
  },
  [Act.addChannelAuto]: (state, { payload: { prefix, type }}) => {
    const tmp_channel = mixinGetHelper(state.channel)
    const id = `${prefix}${tmp_channel.getLastIdx(prefix)+1}`
    return netReducer(state, Act.addChannel(id, type))
  },
  [Act.delChannel]: (state, { payload: { id }}) => {
    delete state.channel[id]
    return {
      ...state,
      channel: {
        ...state.channel
      }
    }
  },
  [Act.copyChannel]: (state, { payload: { id, newid }}) => {
    return {
      ...state,
      channel: {
        ...state.channel,
        [newid]: {
          ...state.channel[id]
        }
      }
    }
  },
  [Act.moveChannel]: (state, { payload: { id, point: [x,y] }}) => {
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
  [Act.assignChannel]: (state, { payload: { id, prop: prop }}) => {
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
  [Act.addApp]: (state, { payload: { id, type } }) => {
    // load application model
    const app_prop = ModelLoader.loadFromType('application', type)
    return {
      ...state,
      apps: {
        ...state.apps,
        [id]: {
          ...app_prop
        }
      }
    }
  },
  [Act.addAppAuto]: (state, { payload: { prefix, type }}) => {
    const tmp_app = mixinGetHelper(state.apps)
    const id = `${prefix}${tmp_app.getLastIdx(prefix)+1}`
    return netReducer(state, Act.addApp(id, type))
  },
  [Act.delApp]: (state, { payload: { id } }) => {
    delete state.apps[id]
    return {
      ...state,
      apps: {
        ...state.apps
      }
    }
  },
  [Act.copyApp]: (state, { payload: { id, newid }}) => {
    return {
      ...state,
      apps: {
        ...state.apps,
        [newid]: {
          ...state.apps[id]
        }
      }
    }
  },
  [Act.assignApp]: (state, { payload: { id, prop } }) => {
    return {
      ...state,
      apps: {
        ...state.apps,
        [id]: {
          ...state.apps[id],
          ...prop
        }
      }
    }
  }
}, null)

// Net Reducer
// }}}
