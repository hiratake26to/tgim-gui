'use strict'
import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Ask from './ask'
import Exception from './exception'
import BasePropsEditor from './base-props-editor'

class NetIfaceForm extends Component {
  render() {
    return (
      <Form.Group inline>
        <label>connect</label>
        <Form.Input id={this.props.id} name="connect" defaultValue={this.props.connect} onChange={this.props.onChange} />
      </Form.Group>
    )
  }
}

class NetIfsForm extends Component {
  render() {
    let i = 0
    const content = this.props.netifs.map( ({connect}) => 
      <NetIfaceForm id={i++} connect={connect} onChange={this.props.onChange}/>
    )

    return content
  }
}

export default class NodePropsEditor extends BasePropsEditor {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delNode(this.props.id)
  )
  handleAskCanncel = () => this.props.showProps('NODE', this.editted)
  handleAskOk      = () => {
    this.editted = this.props.id
    delete this.pprops
    delete this.pdanger
    this.props.showProps('NODE', this.editted)
  }

  handleSave = () => {
    console.log('click save')
    console.log(this.state)
    this.props.assignNodeNetif(this.state.name, JSON.parse(JSON.stringify(this.state.netifs)))
  }

  // dummy
  /*
  state = { 
    name: 'node_0',
    netifs: [
      { connect: 'link_0' },
      { connect: 'link_1' }
    ]
  }
  */
  constructor(prop) {
    super(prop)
  }
  state = { 
    name: this.props.id,
    netifs: JSON.parse(JSON.stringify(
      this.props.node[this.props.id].netifs
    ))
  }

  handleChange = (e, { name, value }) => {
    if (name === 'connect') {
      //console.log(e.target.id)
      const newArray = Object.assign([], this.state.netifs);
      newArray[e.target.id] = 
        { 
          ...this.state.netifs[e.target.id], connect: value
        }
      this.setState(
        { 
          netifs: [ 
            ...newArray
          ] 
        }
      )
    } else {
      this.setState({[name]: value})
    }
  }

  renderPropsForm = () => {
    const { name, netifs } = this.state

    return (
      <Form>
        <Form.Field>
          <label>Name</label>
          <Form.Input name="name" defaultValue={name} onChange={this.handleChange} />
        </Form.Field>
        <NetIfsForm netifs={netifs} onChange={this.handleChange}/>

        <Button.Group fluid>
          <Button>Revert</Button>
          <Button.Or />
          <Button positive onClick={this.handleSave}>Save</Button>
        </Button.Group>
      </Form>
    )
  }
}
