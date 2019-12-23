'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

import {NodeListComponent, ChannelListComponent, ApplicationListComponent} from './toolbox/list-com'

export default class ToolBox extends React.Component {
  constructor(prop) {
    super(prop)

    this.state = {
      header: 'ToolBox'
    }
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
	    <NodeListComponent handleAdd={this.onAddNode} />
	    <ChannelListComponent handleAddChannelAuto={this.props.addChannelAuto}/>
	    <ApplicationListComponent handleAddAppAuto={this.props.addAppAuto}/>
	  </ul>
	</nav>
      </div>
    )
  }

}
