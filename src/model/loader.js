'use strict'
import path from 'path'
import * as fs   from 'fs'

const model_dir = './src/model/'

export function load(dir, name) {
  return JSON.parse( fs.readFileSync( path.join( model_dir, dir, name + '.json')))
}

export function loadFromType(dir, type) {
  return(
  list(dir)
    .map( fname => load(dir, fname) )
    .filter( model => (model.type === type) )
    [0]
  )
}

export function list(dir) {
  return (
    fs
      .readdirSync(path.join( model_dir, dir))
      .filter( fname => (path.extname(fname) === '.json') )
      .map( fname => path.basename(fname, '.json') )
  )
}
