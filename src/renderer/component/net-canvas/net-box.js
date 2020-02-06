// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import NetIcon from './net-icon'
import {Map, fromJS} from 'immutable'

const icons = require.context('../../../../assets/img/box', false, /\.(jpe?g|png)$/)

export default class NetBox extends React.Component {
  constructor(prop) {
    super(prop)
    //console.log(prop)
    this.state = {
      id: prop.id,
      type: prop.box[prop.id].type,
      //image_url: 'assets/img/box/'+prop.box[prop.id].type+'.png' 
      image_url: icons('./'+prop.box[prop.id].type+'.png').default
    }
  }

  findDestBoxPort = (p) => {
    if (!(typeof p == 'object')) return false

    const [to_box, to_port] = p.connect
    if (!to_box || !to_port) return false

    const box_body = this.props.box[to_box]
    if (!box_body) return false

    //console.log('findDestBoxPort', box_body)
    // search destination ports of the box
    if (fromJS(box_body.ports)
        .filter(x=>Map.isMap(x) && x.get('name')===to_port)
        .size <= 0)
      return false

    //console.log('findDestBoxPort: find!')

    return true
  }

  line_list = []
  cache_ports = null
  interval_id = null
  reline = () => {
    { // need reline?
      const box_body = this.props.box[this.state.id]
      if ( !box_body ) return
      const ports = fromJS(box_body.ports)
      if ( ports.equals(this.cache_ports) ) return
      this.cache_ports = ports
    }

    //console.log('ReLine: ' + this.state.id)
    //console.log('line_list', this.line_list)
    this.line_list.map( line_name => {
      this.props.delLine(line_name)
    })
    this.line_list = []
    this.props.value.ports.forEach( p => {
      if (this.findDestBoxPort(p) && p.rel==='child') {
        const line_name = this.props.id+'_to_'+p.connect[0]+'_'+p.connect[1]
        this.props.addLine(line_name,
                            { type: 'BOX', id: this.props.id},
                            { type: 'BOX', id: p.connect[0]})
        this.line_list.push(line_name)
      }
    })
  }

  componentDidMount() {
    this.interval_id = setInterval( this.reline, 100 )
  }

  componentWillUnmount() {
    clearInterval( this.interval_id )
    //this.line_list.map( line_name => {
    //  this.props.delLine(line_name)
    //})
  }

  render() {
    const {isSelect} = this.props.mapPointToState({x: this.props.x, y: this.props.y})
    return <NetIcon
      x={this.props.x}
      y={this.props.y}
      select={isSelect}
      
      name={this.state.id}
      image_url={this.state.image_url}
      onClick={(pos, e) => {this.props.showProps('BOX', this.state.id)}}
      onDragmove={(pos, e) => {this.props.handleDragend(this.state.id, pos.x, pos.y)}}
      onDragend={(pos, e) => {this.props.handleDragend(this.state.id, pos.x, pos.y)}}
    />
  }
}
