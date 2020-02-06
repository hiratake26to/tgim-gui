// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'

function escape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function getIdx(name, prefix) {
  const reg = new RegExp(`^${escape(prefix)}(\\d+)$`)
  const ret = name.match(reg)
  if (ret == null) return -1 // if no index
  return ret[1] || -1 // greater then or equal to 0
}

function getLastIdx(node, prefix) {
  const getIdxWithPre = (name) => getIdx(name, prefix)
  //return Object.keys(node).map(key=>getIdxWithPre(key)).reduce(Math.max)
  return Object.keys(node).map(key=>getIdxWithPre(key)).reduce((acc,i)=>Math.max(acc,i), -1)
  //Object.keys(node).map(key=>console.log(key))
}

const GetHelperTrait = {
  getLastIdx(prefix) {
    return getLastIdx(this, prefix)
  }
}

export
function mixinGetHelper(obj) {
  return Object.assign({}, obj, GetHelperTrait)
}
