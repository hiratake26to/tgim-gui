// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export default class Exception extends Component {
  render() {
    return (
      <Container textAlign='center'>
      <Message negative>
        <Icon.Group size='huge'>
          <Icon name='warning circle' />
        </Icon.Group>
        <Message.Header>Exception</Message.Header>
        <p>{this.props.msg}</p>
      </Message>
      </Container>
    )
  }
}
