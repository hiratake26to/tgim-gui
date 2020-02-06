// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Line, Group} from 'react-konva'

export default class NetLine extends React.Component {
  constructor(prop) {
    super(prop)
    //console.log('NetLine: constructor '+prop.id)

    this.getPoint = (obj) => {
      switch (obj.type) {
        case 'BOX':
          if ( !this.props.box[obj.id] ) return {x: 0, y: 0}
          return this.props.box[obj.id].point
        case 'NODE':
          return this.props.node[obj.id].point
        case 'SUBNET':
          return this.props.subnet[obj.id].point
        case 'CHANNEL':
          if ( !this.props.channel[obj.id] ) return {x: 0, y: 0}
          return this.props.channel[obj.id].point
      }
    }
  }

  render() {
    var fp = this.getPoint(this.props.first)
    var sp = this.getPoint(this.props.second)
    var points = [fp.x, fp.y, sp.x, sp.y]
    //console.log('NetLine: render', fp, sp)

    return (
      <Line
        x={0}
        y={0}
        points={points}
        stroke={'red'}
      />
    )
  }
}
