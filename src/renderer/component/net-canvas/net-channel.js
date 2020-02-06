// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import NetIcon from './net-icon'

//NOTE. require.context is webpack function
const icons = require.context('../../../../assets/img/channel', false, /\.(jpe?g|png)$/)

var icon = {
  'Csma':         icons('./csma1.png').default,
  'PointToPoint': icons('./ppp1.png' ).default,
  'WifiApSta':    icons('./wifi1.png').default,
  'WifiAdhoc':    icons('./wifi2.png').default,
}

export default class NetChannel extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
      id: prop.id,
      type: prop.channel[prop.id].type, // Csma | PointToPoint | WifiApSta | WifiAdhoc
      image_url: icon[prop.channel[prop.id].type]
    }
    //this.state.image = new window.Image(40, 40)
  }

  render() {
    return <NetIcon
      x={this.props.x}
      y={this.props.y}
      name={this.state.id}
      image_url={this.state.image_url}
      onClick={() => this.props.showProps('CHANNEL', this.state.id)}
      onDragmove={(pos, e) => {this.props.handleDragend(this.state.id, pos.x, pos.y)}}
      onDragend={(pos, e) => {this.props.handleDragend(this.state.id, pos.x, pos.y)}}
    />
  }
}
