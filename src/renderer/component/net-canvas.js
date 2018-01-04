'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Layer, Stage, Group} from 'react-konva'
import SplitPane from 'react-split-pane'

import NetNodes    from './net-canvas/net-nodes'
import NetChannels from './net-canvas/net-channels'
import NetLines    from './net-canvas/net-lines'
import NetApps     from './net-canvas/net-apps'

import { Label, Icon, Container, Divider } from 'semantic-ui-react'

export default class NetworkCanvas extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    //console.log(this.props)
    const {node, channel, apps} = this.props.netState
    const {line} = this.props.guiState
    return (
      <div className="canvas-wrapper">
      <div>
        <Stage width={700} height={500}>
          <Layer>
            <NetLines
              node={node} channel={channel} line={line} 
              addLine={this.props.addLine} delLine={this.props.delLine}
            />
          </Layer>
          <Layer>
            <NetNodes
              node={node} channel={channel} line={line} 
              handleMove={this.props.moveNode}
              addLine={this.props.addLine} delLine={this.props.delLine}
              showProps={this.props.showProps}
            />
            <NetChannels
              node={node} channel={channel} line={line} 
              handleMove={this.props.moveChannel}
              showProps={this.props.showProps}
            />
          </Layer>
        </Stage>
      </div>
      <Divider />
      <div>
        <NetApps apps={apps} showProps={this.props.showProps}/>
      </div>
      </div>
    )
  }
}
