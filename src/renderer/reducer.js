// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
/* vim:set foldmethod=marker: */
'use strict'
import {handleActions} from 'redux-actions'
import * as Act from './action'
import * as ModelLoader from '../model/loader'
import { Map, fromJS } from 'immutable'
import {
  defaultNetState,
  defaultGuiState,
  defaultBoxProp,
  defaultNodeProp,
  defaultSubnetProp,
  defaultChannelProp,
  defaultLineProp,
  defaultAppProp
} from './default-states'

import {mixinGetHelper} from './helper'
//////////////////////////////////////////////////
// Error Message Reducer
// {{{

export const errorMessageReducer = handleActions({
  [Act.errorMessage.set]: (state, { payload: {type: type, error: error}}) => {
    return {
      type: type,
      error: error
    }
  },
  [Act.errorMessage.clear]: (state, { payload: {}}) => {
    return {}
  }
}, null)

// Error Message Reducer
// }}}

//////////////////////////////////////////////////
// GUI Reducer
// {{{

export const guiReducer = handleActions({
  [Act.initAllState]: (state) => {
    return {...defaultGuiState, canvas: state.canvas}
  },
  [Act.registerCanvas]: (state, {payload: canvas}) => {
    return {...state, canvas: canvas}
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
        ...state.editor,
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

  // When Node and Box deleted, delete relevant lines
  [Act.delBox]: (state, { payload: { id }}) => {
    // delete relevant line
    fromJS(state.line)
      .filter(v=> v.get('first').equals(fromJS({type:'BOX', id:id}))
               || v.get('second').equals(fromJS({type:'BOX', id:id})) )
      .keySeq()
      .forEach(id=>guiReducer(state, Act.delLine(id)))
    return state
  },
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

  [Act.addBox]: (state, { payload: { id, box_list, type }}) => {
    console.log('box_list',box_list,'type',type)
    return {
      ...state,
      box: {
        ...state.box,
        [id]: {
          //...state.box[id],
          ...defaultBoxProp(box_list, type),
        }
      }
    }
  },
  [Act.addBoxAuto]: (state, { payload: { prefix, box_list, type }}) => {
    const tmp_box = mixinGetHelper(state.box)
    const id = `${prefix}${tmp_box.getLastIdx(prefix)+1}`
    return netReducer(state, Act.addBox(id, box_list, type))
  },
  [Act.delBox]: (state, { payload: { id }}) => {
    // first, delete all connection at box[id]
    var nextState = fromJS(state).toJS()
    const newPorts = fromJS(state.box[id].ports)
      .map(v=>{
        if(typeof v==='string')
          return v //no connection
        if(v.get('rel')==='parent') {
          const [to_box, to_port] = v.get('connect')
          console.log('deb',nextState, to_box, to_port)
          console.log('deb2', nextState.box[to_box].ports)
          const newPorts2 = fromJS(nextState.box[to_box].ports)
            .map(v=>{
              if(typeof v!=='string' && v.get('name')===to_port)
                return v.get('name')
              else
                return v
            })
            .toJS()
          console.log('deb2', newPorts2)
          nextState = netReducer(nextState, Act.reconnectBoxPort(to_box, newPorts2))
          return v.get('name') //delete connection
        }
        if(v.get('rel')==='child')
          return v.get('name') //delete connection
        else
          return v.get('name') //delete connection
      })
      .toJS()
    nextState = netReducer(nextState, Act.reconnectBoxPort(id, newPorts))
    console.log(nextState)

    state = nextState
    // delete box
    delete state.box[id]
    return { 
      ...state,
      box: {
        ...state.box
      }
    }
  },
  [Act.copyBox]: (state, { payload: { id, newid }}) => {
    return {
      ...state,
      box: {
        ...state.box,
        [newid]: {
          ...state.box[id]
        }
      }
    }
  },
  [Act.moveBox]: (state, { payload: { id, point: [x,y] }}) => {
    return {
      ...state,
      box: {
        ...state.box,
        [id]: {
          ...state.box[id],
          point: {
            x: x,
            y: y
          }
        }
      }
    }
  },
  [Act.reconnectBoxPort]: (state, { payload: { id, ports }}) => {
    var box = fromJS(state.box).toJS()

    ///
    // First, delete all ports of destination box relevant current box.
    // After, connect new ports.
    
    // validate
    const invalid = fromJS(ports)
      .filter(Map.isMap)
      .filter(p=>p.get('rel')==='child')
      .flatMap(p=>{
        const [to_box, to_port] = p.get('connect')
        const to_box_ports = fromJS(box[to_box].ports)

        if (!!box[to_box] == false) {
          return ['port('+p.get('name')+') is not found in the destination box!']
        }

        const ports_state = to_box_ports
          .map(x=>{
            if(x===to_port)
              return fromJS({type: 'available', value: x})
            if(Map.isMap(x) && x.get('name')===to_port && x.get('connect').get(0)===id)
              return fromJS({type: 'self_connected', value: x}) // due to already connected
            if(Map.isMap(x) && x.get('name')===to_port)
              return fromJS({type: 'connected', value: x}) // due to already connected
            else
              return fromJS({type: 'noexist', value: x})
          })

        console.log(ports_state)

        const getSize = (type) => ports_state.filter(x=>x.get('type')===type).size
        if (getSize('available') + getSize('self_connected') <= 0)
        {
          if (getSize('connected') > 0)
            return ['destination box('+to_box+')\'s port('+p.get('name')+') is already connected!']
          if (getSize('noexist') > 0)
            return ['destination box('+to_box+')\'s port('+p.get('name')+') is not exist!']
          else
            return ['destination box('+to_box+')\'s port('+p.get('name')+') is invalid, inexpected error!']
        }

        return [] // pass
      })

    if (invalid.size > 0)
    {
      console.log('Act.reconnectBoxPort is failed', invalid.toJS())
      return {...state}
    }

    // delete old port of box destination
    box[id].ports.forEach(p=>{
      if (p.rel == 'child') {
        const [to_box, to_port] = p.connect
        const to_box_ports = fromJS(box[to_box].ports)

        // delete ports of the destination box
        box[to_box].ports = to_box_ports.map(x=>{
          const port_name = typeof x==='string'? x : x.get('name')
          if (port_name===to_port) {
            return port_name // overwrite with port name and delete
          }
          return x // keep
        }).toJS()
        console.log('reconnectBoxPort', box[to_box].ports)

      }
    })

    // update old port to new of connection of box
    ports.forEach(p=>{
      if (p.rel == 'child') {
        const [to_box, to_port] = p.connect
        const to_box_ports = fromJS(box[to_box].ports)

        // search destination ports of the box
        if (to_box_ports.filter(x=>x===to_port).size <= 0) {
          // not found 
          console.log('Act.reconnectBoxPort', 'Warning! not found the port of box of destination')
        }

        // update ports of the destination box
        box[to_box].ports = to_box_ports.map(x=>{
          if (x===to_port) {
            return {name: to_port, connect: [id, p.name], rel: 'parent'}
          } else {
            return x
          }
        }).toJS()

      }
    })

    return {
      ...state,
      box: {
        ...box,
        [id]: {
          ...state.box[id],
          ports: ports 
        }
      }
    }
  },
  [Act.saveBoxProp]: (state, { payload: { id, prop }}) => {
    return fromJS(state)
      .updateIn(['box',id], v=>v.merge(fromJS(prop)))
      .toJS()
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

//////////////////////////////////////////////////
// Project Reducer
// {{{

export const projectReducer = handleActions({
  [Act.setProjectPath]: (state, { payload: path }) => {
    console.log('called setProjectPath')
    return {
      ...state,
      path: path
    }
  },
}, null)
 
// Project Reducer
// }}}
