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

    ipcRenderer.on('open', (event, arg) => {
      //console.log(arg) // print path
      this.onOpen(arg)
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

