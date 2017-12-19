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

  render() {
    return (
      <div>
	<nav id="sidebar">
	  <div className="sidebar-header">
	    {this.state.header}
	  </div>
	  <ul className="list-unstyled components">
	    <NodeListComponent handleAddNode={this.props.addNode} />
	    <ChannelListComponent handleAddChannel={this.props.addChannel}/>
	    <ApplicationListComponent />
	  </ul>
	</nav>
      </div>
    )
  }

}
