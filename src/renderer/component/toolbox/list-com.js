// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {ipcRenderer} from 'electron'
import {Map,fromJS} from 'immutable'
//import {Accordion, Icon} from 'semantic-ui-react'
import octicons from '@primer/octicons'

const icons = require.context('../../../../assets/img', true, /\.(jpe?g|png)$/)

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
        <ul id={this.state.id} className="list-unstyled collapse show">
          {this.state.items && this.state.items.map( it => 
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
        { id: 0, icon: icons('./channel/csma1.png').default, text: 'CSMA',         type: 'Csma'},
        { id: 1, icon: icons('./channel/ppp1.png' ).default,  text: 'PointToPoint', type: 'PointToPoint'},
        { id: 2, icon: icons('./channel/wifi1.png').default, text: 'Wifi Infrastructure', type: 'WifiApSta'},
        { id: 3, icon: icons('./channel/wifi2.png').default, text: 'Wifi Ad-hoc',  type: 'WifiAdhoc'}
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
        {id: 0, type:'NODE',   icon: icons('./node/node.png'  ).default,   text: 'Basic' },
        {id: 1, type:'SUBNET', icon: icons('./node/subnet.png').default, text: 'Subnet'},
      ],
      assign_name_prefix: '_node',
    }

    this.handleClick = (e) => {
      const type = this.state.items[e.id].type
      this.props.handleAdd(type, this.state.assign_name_prefix, true)
    }
  }

}

export class BoxListComponent extends ListComponent {
  constructor(prop) {
    super(prop)

    var id_count = 0
    this.state = {
      id: 'box-list-component',
      header: 'Box',
      //items: [
      //  {id: 0, type:'Terminal', icon: 'assets/img/box/Terminal.png', text: 'Terminal' },
      //],
      //items: Object.entries(box_list).map(([key,value])=>
      //  ({id: id_count++, type: key, value: value, text: key, icon: `assets/img/box/${key}.png`})
      //),
      assign_name_prefix: '_box',
    }

    ipcRenderer.invoke('get-box')
      .then((result)=>{
        this.box_list = result
        console.log(result)
        this.setState({
          items: Object.entries(result).map(([key,value])=>
            ({id: id_count++, type: key, value: value, text: key, icon: icons(`./box/${key}.png`).default})
          )
        })
      })

    this.handleClick = (e) => {
      const type = this.state.items[e.id].type
      this.props.handleAdd(type, this.box_list, this.state.assign_name_prefix)
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
