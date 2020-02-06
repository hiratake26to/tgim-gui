// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import path from 'path'
import * as fs   from 'fs'

const model_dir = './model/'

export function load(basename, name) {
  return (
    JSON.parse(fs.readFileSync(path.join( model_dir, basename + '.json')))
      .filter( obj => (obj.name === name) )[0]
  )
}

export function loadFromType(dir, type) {
  return(
  list(dir)
    .map( fname => load(dir, fname) )
    .filter( model => (model.type === type) )
    [0]
  )
}

export function list(basename) {
  return (
    JSON.parse(fs.readFileSync(path.join( model_dir, basename + '.json')))
      .map( obj => obj.name )
  )
}
