'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import NetIcon from './net-icon'

var icon = {
  'Csma':         'assets/img/channel/csma1.png',
  'PointToPoint': 'assets/img/channel/ppp1.png',
  'WifiApSta':    'assets/img/channel/wifi1.png',
  'WifiAdhoc':    'assets/img/channel/wifi2.png',
}

export default class NetChannel extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
      id: prop.id,
      type: prop.channel[prop.id].type, // Csma | PointToPoint | WifiApSta | WifiAdhoc
      image: null,
    }
    this.state.image = new window.Image(40, 40)
    this.state.image.src = icon[this.state.type]
  }

  render() {
    return <NetIcon
      x={this.props.x}
      y={this.props.y}
      name={this.state.id}
      image={this.state.image}
      onClick={() => this.props.showProps('CHANNEL', this.state.id)}
      onDragmove={(pos, e) => {this.props.handleDragend(this.state.id, pos.x, pos.y)}}
      onDragend={(pos, e) => {this.props.handleDragend(this.state.id, pos.x, pos.y)}}
    />
  }
}
