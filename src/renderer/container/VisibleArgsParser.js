'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import * as fs from 'fs'

/* ***ATTENTION***
 * This Component is not render
 * and only update state once on application started. 
 */

// issue refer to https://github.com/yargs/yargs/issues/781
//import yargs from 'yargs/yargs'
class ArgsParser extends React.Component {
  constructor(prop) {
    super(prop)

    console.log(prop)

    const electron = require('electron')
    const { remote } = electron

    console.log(remote.process.argv)

    import('yargs/yargs').then( (yargs) => {
      const argv = yargs(remote.process.argv.slice(2))
        .usage('$0 <file>', 'open the file', (yargs) => {
          yargs.positional('file', {
            describe: 'DSL file (.json)',
            type: 'string'
          })
        })
        .argv

      console.log(argv)

      if ( argv.file ) {
        const path = argv.file
        console.log('open "' + path + '"')
        const data = JSON.parse( fs.readFileSync(path) )
        prop.initAllState()
        prop.setNetState(data)
      }

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

