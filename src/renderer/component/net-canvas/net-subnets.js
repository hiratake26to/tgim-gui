// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Group} from 'react-konva'
import NetSubnet from './net-subnet'

export default class NetSubnets extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    return (
      <Group>
        { Object.keys(this.props.subnet).map( (key) => {
          var n = this.props.subnet[key]
          return (
            <NetSubnet
              key={key} id={key}
              x={n.point.x} y={n.point.y}

              subnet={this.props.subnet} channel={this.props.channel} line={this.props.line}
              handleDragend={this.props.handleMove}
              addLine={this.props.addLine} delLine={this.props.delLine}
              showProps={this.props.showProps}
            />
          )
        }) }
      </Group>
    )
  }

}

