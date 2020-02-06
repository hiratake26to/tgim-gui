// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Group} from 'react-konva'
import NetLine from './net-line'

export default class NetLines extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    //console.log('NetLines: render')
    return (
      <Group>
        {Object.keys(this.props.line).map( (key) => {
          //console.log('NetLines: line render')
          //console.log(key)
          var l = this.props.line[key]
          return (
            <NetLine
              key    = {key}
              id     = {key}
              first  = {l.first}
              second = {l.second}
              box     = {this.props.box}
              node    = {this.props.node}
              subnet  = {this.props.subnet}
              channel = {this.props.channel}
              line    = {this.props.line}
            />
          )
        })}
      </Group>
    )
  }

}

