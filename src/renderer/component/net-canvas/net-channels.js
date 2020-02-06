// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Group} from 'react-konva'
import NetChannel from './net-channel'

export default class NetChannels extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    return (
      <Group>
        { Object.keys(this.props.channel).map( (key) => {
          var n = this.props.channel[key]
          return (
            <NetChannel
              key={key} id={key}
              x={n.point.x} y={n.point.y}
              channel={this.props.channel}
              handleDragend={this.props.handleMove}

              showProps={this.props.showProps}
            />
          )
        }) }
      </Group>
    )
  }

}
