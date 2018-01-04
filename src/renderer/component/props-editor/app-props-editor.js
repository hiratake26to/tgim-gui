'use strict'
import React, { Component } from 'react'
import { Table, List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Exception from './exception'
import BasePropsEditor from './base-props-editor'

export default class AppPropsEditor extends BasePropsEditor {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delApp(this.props.id)
  )

  handleSave = () => {
    console.log('click save')
    console.log(this.state)
  }

  constructor(prop) {
    super(prop)

    this.state = ({
      ...this.state,
      name: this.props.id,
      type: this.props.apps[this.props.id].type,
      args: this.props.apps[this.props.id].args
    })
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
    console.log('app props render')
    console.log(this.state)
    this.content = (
      <Form>
        <Form.Field>
          <label>Name</label>
          <Form.Input name="name" defaultValue={this.state.name} onChange={this.handleChange} />
        </Form.Field>

        <Divider />

        <Form.Field>
          <label>Type</label>
          <Form.Input name="type" defaultValue={this.state.type} onChange={this.handleChange} />
          <label>Args</label>
          { Object.keys(this.state.args).map( key => {
            return (
              <div>
                <label>{key}</label>
                <Form.Input key={key} name={key} defaultValue={this.state.args[key]} onChange={this.handleArgsChange} />
              </div>
            )
          }) }
        </Form.Field>

        <Divider />

        <Button.Group fluid>
          <Button>Revert</Button>
          <Button.Or />
          <Button positive onClick={this.handleSave}>Save</Button>
        </Button.Group>
      </Form>
    )

    return this.content
  }
}
