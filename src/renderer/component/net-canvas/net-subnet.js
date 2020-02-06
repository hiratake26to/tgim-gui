// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import NetIcon from './net-icon'

const icons = require.context('../../../../assets/img/node', false, /\.(jpe?g|png)$/)

export default class NetSubnet extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
      id: prop.id,
      image_url: icons('./subnet.png').default
    }
    //this.state.image = new window.Image(40, 40)
  }

  line_list = []
  last_netifs = null
  interval_id = null
  reline = () => {
    if ( !this.props.subnet[this.state.id] ) return
    const {netifs} = this.props.subnet[this.state.id]
    if ( JSON.stringify(netifs) === this.last_netifs ) return
    this.last_netifs = JSON.stringify(netifs)

    console.log('ReLine: ' + this.state.id)
    //console.log(this.line_list)
    this.line_list.map( line_name => {
      this.props.delLine(line_name)
    })
    this.line_list = []
    netifs.forEach( obj => {
    //console.log('reline: '+this.props.id+'_to_'+key)
    this.props.addLine(this.props.id+'_to_'+obj.connect,
                        { type: 'SUBNET', id: this.props.id},
                        { type: 'CHANNEL', id: obj.connect})
    this.line_list.push(this.props.id+'_to_'+obj.connect)
    //console.log(this.props.line)
    })
  }

  componentDidMount() {
    // line setter
    this.interval_id = setInterval( this.reline, 100 )
  }

  componentWillUnmount() {
    clearInterval( this.interval_id )
  }

  render() {
    return <NetIcon
      x={this.props.x}
      y={this.props.y}
      name={this.state.id}
      image_url={this.state.image_url}
      onClick={() => this.props.showProps('SUBNET', this.state.id) }
      onDragmove={(pos, e) => {this.props.handleDragend(this.state.id, pos.x, pos.y)}}
      onDragend={(pos, e) => {this.props.handleDragend(this.state.id, pos.x, pos.y)}}
    />
  }
}
