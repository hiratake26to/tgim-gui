'use strict'
import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Input, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Exception from './exception'
import BasePropsEditor from './base-props-editor'

export default class ChannelPropsEditor extends BasePropsEditor {
  init = () => {
    this.state = {
      ...this.state,
      name: this.props.id,
      config: this.props.channel[this.props.id].config
    }
  }
  constructor(prop) {
    super(prop)
    this.init()
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delChannel(this.props.id)
  )

  handleSave = () => {
    console.log('click save, ChannelPropsEditor.state->', this.state)
    // [TODO] assertion
    // valid new node name wheather it is duplicate to exised node.
    // check whether state.name same to initial name.
    if (this.props.id != this.state.name) {
      // then editor will change name
      // check, new node name wheather it is duplicate to exised node.
      if (this.state.name in this.props.channel) {
        // invalid!
        showSaveError("could not to save. due to duplicate channel name.");
        return;
      }
    }
    
    // update
    this.props.assignChannel(this.props.id,
      {
        config:{
          ...this.state.config
        }
      }
    )

    // when node name change, copy current node to new node, and delete current node.
    if (this.state.name != this.props.id) {
      this.props.node
      this.props.copyChannel(this.props.id, this.state.name)
      this.props.delChannel(this.props.id)
    }
  }

  handleRevert = () => {
    this.init()
    this.setState(this.state) // force rerender
  }
  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }
  handleChangeConfig = (e, {name, value}) => {
    this.setState({
      config: {
        ...this.state.config,
        [name]:value
      }
    })
  }

  renderPropsForm = () => {
    this.content = (
      <Form>
        <Form.Field>
          <label>Name</label>
          <Input name="name" placeholder='Name' value={this.state.name} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Delay</label>
          <Input name="Delay" placeholder='1ms' value={this.state.config.Delay} onChange={this.handleChangeConfig} />
        </Form.Field>
        <Form.Field>
          <label>DataRate</label>
          <Input name="DataRate" placeholder='100Mbps' value={this.state.config.DataRate} onChange={this.handleChangeConfig} />
        </Form.Field>
        <Button.Group fluid>
          <Button onClick={this.handleRevert}>Revert</Button>
          <Button.Or />
          <Button positive onClick={this.handleSave}>Save</Button>
        </Button.Group>
      </Form>
    )

    return this.content
  }
}
