'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

export class ListComponent extends React.Component {
  constructor(prop) {
    super(prop)
  }
  
  render() {
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
              <a onClick={function(){this.handleClick(it.id)}.bind(this)}> <img src={it.icon} />{it.text}</a>
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
      ]
    }

    this.handleClick = (id) => {
      // TODO: add Channel icon to the NetCanvas
      console.log(id)
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
	{ id: 0, icon: 'img/Emu.png',         text: 'Emu (temp)'    },
	{ id: 1, icon: 'img/Pc.png',          text: 'PC'            },
	{ id: 2, icon: 'img/Router.png',      text: 'Router (temp)' },
	{ id: 3, icon: 'img/StationWifi.png', text: 'STA (temp)'    },
	{ id: 4, icon: 'img/Tap.png',         text: 'TAP (temp)'    }
      ]
    }

    this.handleClick = (id) => {
      // TODO: add Node icon to the NetCanvas
      console.log(id)
    }

  }

}
