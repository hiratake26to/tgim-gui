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
    //console.log('NetLine: render')
    var fp = this.getPoint(this.props.first)
    var sp = this.getPoint(this.props.second)
    var points = [fp.x, fp.y, sp.x, sp.y]
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
