// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export default class Ask extends Component {
  render() {
    return (
      <div>
      <Container textAlign='center'>
      <Message info>
        <Icon.Group size='huge'>
          <Icon name='help circle' />
        </Icon.Group>
        <Message.Header>Ask</Message.Header>
        <p>{this.props.msg}</p>
      </Message>
      </Container>
      <Divider />
      <Button.Group fluid>
        <Button onClick={this.props.onCanncel}>Canncel</Button>
        <Button.Or />
        <Button onClick={this.props.onOk} positive>OK</Button>
      </Button.Group>
      </div>
    )
  }
}
