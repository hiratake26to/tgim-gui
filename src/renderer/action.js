'use strict'
import {createAction, createActions} from 'redux-actions'

// used when loaded data from file
export const initAllState = createAction('INIT_All_STATE')
export const registerCanvas = createAction('REGISTER_CANVAS', (canvas) => (canvas))
export const setNetState = createAction('SET_NET_STATE', (newState) => (newState))
export const setProjectPath = createAction('SET_PROJECT_PATH', (path) => (path))

// ErrorMessage
export const errorMessage = createActions({
  SET: (type, error) => ({type: type, error: error}),
  CLEAR: () => ({})
})

// Box
export const addBox     = createAction('ADD_BOX',      (id, box_list, type)     => ({ id: id, box_list: box_list, type: type }))
export const addBoxAuto = createAction('ADD_BOX_AUTO', (prefix, box_list, type) => ({ prefix: prefix, box_list: box_list, type: type }))
export const delBox     = createAction('DEL_BOX',      (id)           => ({ id: id }))
export const copyBox    = createAction('COPY_BOX',     (id, newid)    => ({ id: id, newid: newid }))
export const moveBox    = createAction('MOVE_BOX',     (id, x, y)     => ({ id: id, point: [x,y] }))
export const reconnectBoxPort = createAction('RECONNECT_BOX_PORT', (id, ports) => ({ id: id, ports: ports }) )
export const saveBoxProp = createAction('SAVE_BOX_PROP', (id, prop) => ({id:id, prop:prop}))

// Node
export const addNode         = createAction('ADD_NODE',          (id)         => ({ id: id }))
export const addNodeAuto     = createAction('ADD_NODE_AUTO',     (prefix)     => ({ prefix: prefix }))
export const delNode         = createAction('DEL_NODE',          (id)         => ({ id: id }))
export const copyNode        = createAction('COPY_NODE',         (id, newid)  => ({ id: id, newid: newid }))
export const moveNode        = createAction('MOVE_NODE',         (id, x, y)   => ({ id: id, point: [x,y] }))
export const assignNode      = createAction('ASSIGN_NODE',       (id, prop)   => ({ id: id, prop:prop }) )
// netif
export const addNodeNetif    = createAction('ADD_NODE_NETIF',    (id, prop)   => ({ id: id, prop:prop }) )    // not usually
export const delNodeNetif    = createAction('DEL_NODE_NETIF',    (id, index)  => ({ id: id, index:index }) ) // not usually
export const assignNodeNetif = createAction('ASSIGN_NODE_NETIF', (id, netifs) => ({ id: id, netifs: netifs }) )

// Subnet
export const addSubnet         = createAction('ADD_SUBNET',          (id)         => ({ id: id }))
export const addSubnetAuto     = createAction('ADD_SUBNET_AUTO',     (prefix)     => ({ prefix: prefix }))
export const delSubnet         = createAction('DEL_SUBNET',          (id)         => ({ id: id }))
export const moveSubnet        = createAction('MOVE_SUBNET',         (id, x, y)   => ({ id: id, point: [x,y] }))
export const assignSubnet      = createAction('ASSIGN_SUBNET',       (id, prop)   => ({ id: id, prop:prop }) )
// netif
export const addSubnetNetif    = createAction('ADD_SUBNET_NETIF',    (id, prop)   => ({ id: id, prop:prop }) )    // not usually
export const delSubnetNetif    = createAction('DEL_SUBNET_NETIF',    (id, index)  => ({ id: id, index:index }) ) // not usually
export const assignSubnetNetif = createAction('ASSIGN_SUBNET_NETIF', (id, netifs) => ({ id: id, netifs: netifs }) )

// Channel
export const addChannel     = createAction('ADD_CHANNEL',      (id, type) => ({ id: id, type: type }))
export const addChannelAuto = createAction('ADD_CHANNEL_AUTO', (prefix, type) => ({ prefix: prefix, type: type }))
export const delChannel     = createAction('DEL_CHANNEL',      (id)       => ({ id: id }))
export const copyChannel    = createAction('COPY_CHANNEL',     (id, newid)=> ({ id: id, newid: newid }))
export const moveChannel    = createAction('MOVE_CHANNEL',     (id, x, y) => ({ id: id, point: [x,y] }))
export const assignChannel  = createAction('ASSIGN_CHANNEL',   (id, prop) => ({ id: id, prop:prop }))

// App
export const addApp     = createAction('ADD_APP',     (id, type)     => ({ id: id, type: type }))
export const addAppAuto = createAction('ADD_APP_AUTO',(prefix, type) => ({ prefix: prefix, type: type }))
export const delApp     = createAction('DEL_APP',     (id)           => ({ id: id }))
export const copyApp    = createAction('COPY_APP',    (id, newid)    => ({ id: id, newid: newid }))
export const assignApp  = createAction('ASSIGN_APP',  (id, prop)     => ({ id: id, prop:prop }))

// Line
export const addLine = createAction('ADD_LINE', (id, first, second) => ({ id: id, first: first, second: second}))
export const delLine = createAction('DEL_LINE', (id) => ({ id: id }))

// Editor
export const showProps = createAction('SHOW_PROPS', (type, id) => ({ type: type, id: id}))
export const hideProps = createAction('HIDE_PROPS')

// Selector
export const selectWithinRectangle = createAction('SELECT_WITHIN_RECTANGLE')

// Working directory
export const changeWorkDir = createAction('CHANGE_WORK_DIR', (path) => ({ path: path}))
