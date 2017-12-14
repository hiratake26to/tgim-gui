'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Layer, Stage, Group} from 'react-konva'

import NetNodes    from './net-canvas/net-nodes'
import NetChannels from './net-canvas/net-channels'
import NetLines    from './net-canvas/net-lines'

export default class NetworkCanvas extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    return (
      <Stage width={700} height={500}>
        <Layer>
          <NetLines node={this.props.node} channel={this.props.channel} line={this.props.line} />
        </Layer>
        <Layer>
          <NetNodes
            node={this.props.node} channel={this.props.channel} line={this.props.line}
            handleMove={this.props.moveNode}
            addLine={this.props.addLine} delLine={this.props.delLine}
            showProps={this.props.showProps}
          />
          <NetChannels node={this.props.node} channel={this.props.channel} line={this.props.line} handleMove={this.props.moveChannel} />
        </Layer>
      </Stage>
    )
  }
}
