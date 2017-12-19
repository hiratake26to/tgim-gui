'use strict'
import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Ask from './ask'
import Exception from './exception'

export default class BasePropsEditor extends Component {
  state = { activeItem: 'props' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  editted = this.props.id
  pprops = null
  pdanger = null

  render() {
    const { activeItem } = this.state

    if ( !this.pprops ) {
      this.pprops = this.renderPropsForm()
    }

    if ( !this.pdanger ) {
      this.pdanger = (
        <Form>
          <Button negative onClick={this.handleDeleteClick}>Delete</Button>
        </Form>
      )
    }

    if (this.editted != this.props.id) {
      return (
        <Ask msg='Do you want to cancel the current change?'
          onCanncel = {this.handleAskCanncel}
          onOk      = {this.handleAskOk}
        />
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
