'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Layer, Stage, Group, Rect} from 'react-konva'
import SplitPane from 'react-split-pane'

import NetNodes    from './net-canvas/net-nodes'
import NetSubnets    from './net-canvas/net-subnets'
import NetChannels from './net-canvas/net-channels'
import NetLines    from './net-canvas/net-lines'
import NetApps     from './net-canvas/net-apps'

import { Label, Icon, Container, Header, Divider, Menu } from 'semantic-ui-react'
import {pointWithinFrame} from './util'

function pointToRectangle(rect_xy1, rect_xy2) {
  return {
    height: (rect_xy2[1] - rect_xy1[1]),
    width: (rect_xy2[0] - rect_xy1[0]),
    x: rect_xy1[0],
    y: rect_xy1[1],
  }
}

export default class NetworkCanvas extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
      rect_xy1: [100,100],
      rect_xy2: [200,200],
      isDrag: false,
    }
  }

  handleMouseDown = (handle) =>{
    //console.log(handle);
    const {layerX, layerY} = handle.evt
    this.setState({
      rect_xy1: [layerX, layerY],
      isDrag: true,
    })
  }
  handleMouseMove = (handle) =>{
    if (!this.state.isDrag) return
    //console.log(handle);
    const {layerX, layerY} = handle.evt
    this.setState({
      rect_xy2: [layerX, layerY],
    })
  }
  handleMouseUp = (handle) =>{
    //console.log(handle);
    const {layerX, layerY} = handle.evt
    this.setState({
      rect_xy2: [layerX, layerY],
      isDrag: false,
    }, () => {
      this.props.selectWithinRectangle(
        pointToRectangle(this.state.rect_xy1, this.state.rect_xy2)
      )
    })
  }

  mapPointToState = (point) => {
    const rect = pointToRectangle(this.state.rect_xy1, this.state.rect_xy2)
    const frame = [
      [rect.x, rect.y],
      [rect.x+rect.width, rect.y],
      [rect.x+rect.width, rect.y+rect.height],
      [rect.x, rect.y+rect.height],
    ]

    //console.log('point, frame:', [point.x, point.y], frame)
    const ret = {
      isSelect: pointWithinFrame([point.x, point.y], frame)
    }
    //console.log('mapPointToState, ret:', ret)
    return ret
  }

  render() {
    const {node, subnet, channel, apps} = this.props.netState
    const {line, selector} = this.props.guiState

    var rectangle = (
      <Rect
      x={this.state.rect_xy1[0]}
      y={this.state.rect_xy1[1]}
      width={this.state.rect_xy2[0]-this.state.rect_xy1[0]}
      height={this.state.rect_xy2[1]-this.state.rect_xy1[1]}
      stroke="gray"
      dash={[5,5]}
      />
    )

    return (
      <div className="canvas-wrapper">
      <div>
        {/*[TODO] 選択範囲の要素の色合いを変える*/}
        <Menu pointing secondary>
          <Menu.Item name={this.props.netState.name} active={true}>
            {this.props.netState.name}
          </Menu.Item>
        </Menu>

        <Stage width={700} height={450}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp} >
          <Layer>
            <Rect width={700} height={450} onMouseDown={this.handleMouseDown}/>
            {rectangle}
          </Layer>
          <Layer>
            <NetLines
              node={node} subnet={subnet} channel={channel} line={line} 
              addLine={this.props.addLine} delLine={this.props.delLine}
            />
          </Layer>
          <Layer>
            <NetNodes
              mapPointToState={this.mapPointToState}
              node={node} channel={channel} line={line} 
              handleMove={this.props.moveNode}
              addLine={this.props.addLine} delLine={this.props.delLine}
              showProps={this.props.showProps}
            />
            <NetSubnets
              subnet={subnet} channel={channel} line={line} 
              handleMove={this.props.moveSubnet}
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
