'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

export class ListComponent extends React.Component {
  constructor(prop) {
    super(prop)
  }
  
  render() {
    const render_icon = (icon) => {
      if (!icon) return false
      return <img src={icon} />
    }
    return (
      <div>
        <li>
          <a href={'#'+this.state.id} data-toggle="collapse" aria-expanded="true" aria-controls={this.state.id}>
            {this.state.header}
          </a>
        </li>
        <ul id={this.state.id} className="collapse list-unstyled">
          {this.state.items.map( it => 
            <li key={it.id}>
              <a onClick={function(){this.handleClick(it.id)}.bind(this)}>
                {render_icon(it.icon)} {it.text}
              </a>
            </li>
          ) }
        </ul>
      </div>
    )
  }

}

//
// Defined by user
//

export class ChannelListComponent extends ListComponent {
  constructor(prop) {
    super(prop)

    this.state = {
      id: 'channel-list-component',
      header: 'Channel',
      items: [
	{ id: 0, icon: 'img/Ap-Wifi.png', text: 'AP (temp)'     },
	{ id: 1, icon: 'img/Hub.png',     text: 'Hub (temp)'    },
	{ id: 2, icon: 'img/Switch.png',  text: 'Switch (temp)' }
      ],
      assign_name_prefix: '__default',
      last_assign: 0
    }

    this.handleClick = (id) => {
      // TODO: add Channel icon to the NetCanvas (will be marge form NodeListComponent)
      var name = this.state.assign_name_prefix + this.state.last_assign
      this.state.last_assign++
      this.props.handleAddChannel(name)
    }

  }

}

export class NodeListComponent extends ListComponent {
  constructor(prop) {
    super(prop)

    this.state = {
      id: 'node-list-component',
      header: 'Node',
      items: [
        {id: 0, type:'EMU', icon :'img/Emu.png',         text :'Emu(temp)'    },
        {id: 1, type:'PC',  icon :'img/Pc.png',          text :'PC'           },
        {id: 2, type:'RT',  icon :'img/Router.png',      text :'Router(temp)' },
        {id: 3, type:'STA', icon :'img/StationWifi.png', text :'STA(temp)'    },
        {id: 4, type:'TAP', icon :'img/Tap.png',         text :'TAP(temp)'    }
      ],
      assign_name_prefix: '__default',
      last_assign: 0
    }

    this.handleClick = (id) => {
      // FIXME: it necessary assign unique name to a node
      //console.log(this.state.items[id].type)
      var name = this.state.assign_name_prefix + this.state.last_assign
      this.state.last_assign++
      this.props.handleAddNode(name)
    }
  }

}

export class ApplicationListComponent extends ListComponent {
  constructor(prop) {
    super(prop)

    this.state = {
      id: 'application-list-component',
      header: 'Application',
      items: [
	{ id: 0, icon: '', text: 'Ping'     },
	{ id: 1, icon: '', text: 'BulkSend' }
      ],
      assign_name_prefix: '__default',
      last_assign: 0
    }

    this.handleClick = (id) => {
      // FIXME
      console.log(id)
      var name = this.state.assign_name_prefix + this.state.last_assign
      this.state.last_assign++
      this.props.handleAddApp(name)
    }

  }

}
