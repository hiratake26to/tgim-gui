'use strict'
import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Exception from './exception'
import BasePropsEditor from './base-props-editor'

export default class ChannelPropsEditor extends BasePropsEditor {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delChannel(this.props.id)
  )

  renderPropsForm = () => {
    const name       = this.props.id
    return (
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' defaultValue={name} />
        </Form.Field>
        <Form.Field>
          <label>Delay</label>
          <input placeholder='1ms' />
        </Form.Field>
        <Form.Field>
          <label>DataRate</label>
          <input placeholder='1Mbps' />
        </Form.Field>
        <Button.Group fluid>
          <Button>Revert</Button>
          <Button.Or />
          <Button positive>Save</Button>
        </Button.Group>
      </Form>
    )
  }
}
