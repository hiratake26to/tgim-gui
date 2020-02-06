// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Group} from 'react-konva'
import NetBox from './net-box'

export default class NetBoxes extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    //console.log('Box debug', this.props.box)
    return (
      <Group>
        { Object.keys(this.props.box).map( (key) => {
          var n = this.props.box[key]
          return (
            <NetBox
              key={key} id={key}
              value={n}
              x={n.point.x} y={n.point.y}
              mapPointToState={this.props.mapPointToState}

              box={this.props.box}
              node={this.props.node} channel={this.props.channel} line={this.props.line}
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

