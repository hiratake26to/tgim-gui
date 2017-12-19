'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Group} from 'react-konva'
import NetNode from './net-node'

export default class NetNodes extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    return (
      <Group>
        { Object.keys(this.props.node).map( (key) => {
          var n = this.props.node[key]
          return (
            <NetNode
              key={key} id={key}
              x={n.point.x} y={n.point.y}

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

