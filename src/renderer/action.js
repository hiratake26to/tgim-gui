'use strict'
import {createAction} from 'redux-actions'

// Node
export const addNode       = createAction('ADD_NODE',       (id)       => ({ id: id }))
export const delNode       = createAction('DEL_NODE',       (id)       => ({ id: id }))
export const moveNode      = createAction('MOVE_NODE',      (id, x, y) => ({ id: id, point: [x,y] }))
export const assignNode    = createAction('ASSIGN_NODE',    (id, prop) => ({ id: id, prop:prop }) )
export const addNodeNetif  = createAction('ADD_NODE_NETIF',(id, prop) => ({ id: id, prop:prop }) )    // not usually
export const delNodeNetif  = createAction('DEL_NODE_NETIF',(id, index) => ({ id: id, index:index }) ) // not usually
export const assignNodeNetif  = createAction('ASSIGN_NODE_NETIF',(id, netifs) => ({ id: id, netifs: netifs }) )

// Channel
export const addChannel    = createAction('ADD_CHANNEL',    (id)       => ({ id: id }))
export const delChannel    = createAction('DEL_CHANNEL',    (id)       => ({ id: id }))
export const moveChannel   = createAction('MOVE_CHANNEL',   (id, x, y) => ({ id: id, point: [x,y] }))
export const assignChannel = createAction('ASSIGN_CHANNEL', (id, prop) => ({ id: id, prop:prop }))

// Line
export const addLine = createAction('ADD_LINE', (id, first, second) => ({ id: id, first: first, second: second}))
export const delLine = createAction('DEL_LINE', (id) => ({ id: id }))

// Editor
export const showProps = createAction('SHOW_PROPS', (type, id) => ({ type: type, id: id}))
export const hideProps = createAction('HIDE_PROPS')
