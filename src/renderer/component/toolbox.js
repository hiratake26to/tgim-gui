// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

import {
  BoxListComponent,
  NodeListComponent, 
  ChannelListComponent, 
  ApplicationListComponent
} from './toolbox/list-com'

export default class ToolBox extends React.Component {
  constructor(prop) {
    super(prop)

    this.state = {
      header: 'ToolBox'
    }
  }

  onAddBox = (type, box_list, name) => {
    console.log('onasfe',name,box_list,type)
    this.props.addBoxAuto(name, box_list, type)
  }
  onAddNode = (type, name, auto=false) => {
    if (type === 'NODE') {
      this.props.addNodeAuto(name)
    } else if (type === 'SUBNET') {
      this.props.addSubnetAuto(name)
    }
  }

  render() {
    return (
      <div>
	<nav id="sidebar">
	  <div className="sidebar-header">
	    {this.state.header}
	  </div>
	  <ul className="list-unstyled components">
	    <BoxListComponent handleAdd={this.onAddBox} />
	    <NodeListComponent handleAdd={this.onAddNode} />
	    <ChannelListComponent handleAddChannelAuto={this.props.addChannelAuto}/>
	    <ApplicationListComponent handleAddAppAuto={this.props.addAppAuto}/>
	  </ul>
	</nav>
      </div>
    )
  }

}
