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
        { id: 0, icon: 'assets/img/channel/csma1.png', text: 'CSMA',         type: 'Csma'},
        { id: 1, icon: 'assets/img/channel/ppp1.png',  text: 'PointToPoint', type: 'PointToPoint'},
        { id: 2, icon: 'assets/img/channel/wifi1.png', text: 'Wifi Infrastructure', type: 'WifiApSta'},
        { id: 3, icon: 'assets/img/channel/wifi2.png', text: 'Wifi Ad-hoc',  type: 'WifiAdhoc'}
      ],
      assign_name_prefix: '_ch',
    }

    this.handleClick = (e) => {
      const type = this.state.items[e.id].type
      this.props.handleAddChannelAuto(this.state.assign_name_prefix, type)
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
        {id: 0, type:'NODE',   icon: 'assets/img/node/node.png',   text: 'Basic' },
        {id: 1, type:'SUBNET', icon: 'assets/img/node/subnet.png', text: 'Subnet'},
      ],
      assign_name_prefix: '_node',
    }

    this.handleClick = (e) => {
      const type = this.state.items[e.id].type
      this.props.handleAdd(type, this.state.assign_name_prefix, true)
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
      assign_name_prefix: '_app',
    }

    this.handleClick = (e) => {
      this.props.handleAddAppAuto(this.state.assign_name_prefix, e.type)
    }

  }

}
