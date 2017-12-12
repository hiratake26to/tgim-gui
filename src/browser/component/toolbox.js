'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

import {NodeListComponent, ChannelListComponent} from './toolbox/ListComponent'

class SideBar extends React.Component {
  constructor(prop) {
    super(prop)

    this.state = {
      header: prop.header || 'HEADER'
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
	    <NodeListComponent />
	    <ChannelListComponent />
	  </ul>
	</nav>
      </div>
    )
  }

}

export default class ToolBox extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    return (
      <SideBar header={'Toolbox'}/>
    )
  }
}
