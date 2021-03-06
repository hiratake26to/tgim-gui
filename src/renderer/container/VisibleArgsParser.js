// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import * as fs from 'fs'
const {ipcRenderer} = require('electron')

/* ***ATTENTION***
 * This Component is not render
 * and only update state once on application started. 
 */

class ArgsParser extends React.Component {
  constructor(prop) {
    super(prop)

    this.onOpen = (path) => {
      //console.log('p path:'+path)
      //console.log('open "' + path + '"')
      const data = JSON.parse( fs.readFileSync(path) )
      prop.initAllState()
      prop.setNetState(data)
    }

    ipcRenderer.on('open-project', (event, arg) => {
      //console.log(arg) // print path
      //this.onOpen(arg)
      console.log(`ArgsParse open "${arg}"`)
      this.props.initAllState()
      this.props.setProjectPath(arg.path)
      this.props.setNetState(arg.payload.netState)
    })
  }
  render() {
    return false
  }
}


import TgimMenu from '../component/menu'
import * as Actions from '../action'

const mapStateToProps = state => {
  return state
}

import {bindActionCreators} from 'redux'
const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch)
}

import {connect} from 'react-redux'
const VisibleArgsParser = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArgsParser)

export {VisibleArgsParser}

