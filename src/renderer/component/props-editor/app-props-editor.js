'use strict'
import React, { Component } from 'react'
import { Table, List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Exception from './exception'
import BasePropsEditor from './base-props-editor'

export default class AppPropsEditor extends BasePropsEditor {
  init = () => {
    this.state = ({
      ...this.state,
      name: this.props.id,
      type: this.props.apps[this.props.id].type,
      args: this.props.apps[this.props.id].args
    })
  }
  constructor(prop) {
    super(prop)
    this.init()
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delApp(this.props.id)
  )

  handleSave = () => {
    console.log('click save, ChannelPropsEditor.state->', this.state)
    console.log(this.state)
    this.props.assignApp(this.props.id, this.state)

    // [TODO] assertion
    // valid new apps name wheather it is duplicate to exised apps.
    // check whether state.name same to initial name.
    if (this.props.id != this.state.name) {
      // then editor will change name
      // check, new apps name wheather it is duplicate to exised apps.
      if (this.state.name in this.props.apps) {
        // invalid!
        showSaveError("could not to save. due to duplicate apps name.");
        return;
      }
    }
    
    // update
    this.props.assignApp(this.props.id, this.state)

    // when apps name change, copy current apps to new apps, and delete current apps.
    if (this.state.name != this.props.id) {
      this.props.copyApp(this.props.id, this.state.name)
      this.props.delApp(this.props.id)
      this.props.showProps('APP', this.state.name)
    }
  }

  handleRevert = () => {
    this.init()
    this.setState(this.state) // force rerender
  }
  handleChange = (e, { name, value }) => {
    this.setState({[name]: value})
  }
  handleArgsChange = (e, { name, value }) => {
    this.setState({
      args: {
        ...this.state.args,
        [name]: value
      }
    })
  }

  renderPropsForm = () => {
    //console.log('app props render')
    //console.log(this.state)
    this.content = (
      <Form>
        <Form.Field>
          <label>Name</label>
          <Form.Input name="name" value={this.state.name} onChange={this.handleChange} />
        </Form.Field>

        <Divider />

        <Form.Field>
          <label>Type</label>
          <Form.Input name="type" value={this.state.type} onChange={this.handleChange} />
          <label>Args</label>
          { Object.keys(this.state.args).map( key => {
            return (
              <div>
                <label>{key}</label>
                <Form.Input key={key} name={key} value={this.state.args[key]} onChange={this.handleArgsChange} />
              </div>
            )
          }) }
        </Form.Field>

        <Divider />

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
