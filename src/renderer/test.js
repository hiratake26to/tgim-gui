'use strict'
import {assert} from 'chai'

//////////////////////////////////////////////////
// helper

import * as helper from './helper'

describe('helper', function() {
  // dummy node obj
  const node = {
    _node3: {},
    _ch1: {},
    _node1: {},
    _ch2: {},
    _node0: {},
  }
  describe('.mixinGetHelper', function() {
    // mixin
    const tempNode = helper.mixinGetHelper(node)

    it('has getLastIdx', function() {
      assert.property(tempNode, 'getLastIdx')
    })
    it('find index least', function() {
      assert.equal(tempNode.getLastIdx('_node'), 3)
      assert.equal(tempNode.getLastIdx('_ch'), 2)
    })
    it('return -1 if no find index', function() {
      assert.equal(tempNode.getLastIdx('_dummy'), -1)
    })
  })
})
