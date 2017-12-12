'use strict'
import {createAction} from 'redux-actions'

export const addNode       = createAction('ADD_NODE',       (id)       => ({ id: id }))
export const moveNode      = createAction('MOVE_NODE',      (id, x, y) => ({ id: id, point: [x,y] }))
export const assignNode    = createAction('ASSIGN_NODE',    (id, prop) => ({ id: id, prop:prop }) )

export const addChannel    = createAction('ADD_CHANNEL',    (id)       => ({ id: id }))
export const moveChannel   = createAction('MOVE_CHANNEL',   (id, x, y) => ({ id: id, point: [x,y] }))
export const assignChannel = createAction('ASSIGN_CHANNEL', (id, prop) => ({ id: id, prop:prop }))

export const addLine = createAction('ADD_LINE', (id, first, second) => ({ id: id, first: first, second: second}))
export const delLine = createAction('DEL_LINE', (id) => ({ id: id }))
