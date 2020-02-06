// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Modal, Segment, Sidebar } from 'semantic-ui-react'

import Exception from './exception'

export default class BasePropsEditor extends Component {
  constructor(prop) {
    super(prop)

    this.state = { activeItem: 'props' }
    this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    this.pprops = null
    this.pdanger = null
  }

  render() {
    const { activeItem } = this.state

    this.pprops = this.renderPropsForm()

    if ( !this.pdanger ) {
      this.pdanger = (
        <Form>
          <Button negative onClick={this.handleDeleteClick}>Delete</Button>
        </Form>
      )
    }

    const content = (()=>{

      switch (activeItem) {
        case 'props': return this.pprops
        case 'danger': return this.pdanger
        default: return <Exception msg='active tab is invalided!'/>
      }
      
    })()

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='props' active={activeItem === 'props'} onClick={this.handleItemClick} />
          <Menu.Item name='danger' active={activeItem === 'danger'} onClick={this.handleItemClick} />
        </Menu>
        {content}
      </div>
    )
  }
}
