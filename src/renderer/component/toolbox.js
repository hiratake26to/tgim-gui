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

  onAddNode = (type, name) => {
    if (type === 'NODE') {
      this.props.addNode(name)
    } else if (type === 'SUBNET') {
      this.props.addSubnet(name)
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
	    <ChannelListComponent handleAddChannel={this.props.addChannel}/>
	    <ApplicationListComponent handleAddApp={this.props.addApp}/>
	  </ul>
	</nav>
      </div>
    )
  }

}
