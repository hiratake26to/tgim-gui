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
        <ul id={this.state.id} className="list-unstyled collapse in">
          {this.state.items.map( it => 
            <li key={it.id}>
              <a onClick={function(){this.handleClick(it)}.bind(this)}>
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
        { id: 0, icon: 'assets/img/Ap-Wifi.png', text: 'AP (temp)'     },
	{ id: 1, icon: 'assets/img/Hub.png',     text: 'Hub (temp)'    },
	{ id: 2, icon: 'assets/img/Switch.png',  text: 'Switch (temp)' }
      ],
      assign_name_prefix: '__ch_default',
      last_assign: 0
    }

    this.handleClick = (e) => {
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
        {id: 0, type:'NODE',   icon: 'assets/img/Pc.png',          text: 'Basic' },
        {id: 1, type:'SUBNET', icon: 'assets/img/icon/subnet.png', text: 'Subnet'     },
        /*
        {id: 2, type:'EMU',    icon: 'assets/img/Emu.png',         text: 'Emu(temp)'    },
        {id: 3, type:'RT',     icon: 'assets/img/Router.png',      text: 'Router(temp)' },
        {id: 4, type:'STA',    icon: 'assets/img/StationWifi.png', text: 'STA(temp)'    },
        {id: 5, type:'TAP',    icon: 'assets/img/Tap.png',         text: 'TAP(temp)'    }
        */
      ],
      assign_name_prefix: '__node_default',
      last_assign: 0
    }

    this.handleClick = (e) => {
      // FIXME: it necessary assign unique name to a node
      //console.log(this.state.items[e.id].type)
      const name = this.state.assign_name_prefix + this.state.last_assign
      const type = this.state.items[e.id].type
      this.state.last_assign++
      this.props.handleAdd(type, name)
    }
  }

}

import * as ModelLoader from '../../../model/loader'

export class ApplicationListComponent extends ListComponent {
  constructor(prop) {
    super(prop)

    const app_models = ModelLoader.list('application')
    const items = app_models
      .map( fname => ModelLoader.load('application', fname))
      .map( model => ( {
            id: model.type,
            type: model.type,
            icon: '',
            text: model.name 
          }))
    /*
      const items = [
	{ id: 0, type: 'ping', icon: '', text: 'Ping'     },
	{ id: 1, type: '...', icon: '', text: 'BulkSend' }
      ]
    */
    console.log(items)

    this.state = {
      id: 'application-list-component',
      header: 'Application',
      items: items,
      assign_name_prefix: '__app_default',
      last_assign: 0
    }

    this.handleClick = (e) => {
      // FIXME
      console.log(e)
      var name = this.state.assign_name_prefix + this.state.last_assign
      this.state.last_assign++
      this.props.handleAddApp(name, e.type )
    }

  }

}
