'use strict'
import React, { Component } from 'react'
import { Table, List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Exception from './exception'
import BasePropsEditor from './base-props-editor'

class NetIfaceForm extends Component {
  // onDelete(this.props.id)
  render() {
    return (
      <div>
        <Form.Group>
          <Form.Input id={this.props.id} placeholder="up" name="up" defaultValue={this.props.up} onChange={this.props.onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Input id={this.props.id} placeholder="connect" name="connect" defaultValue={this.props.connect} onChange={this.props.onChange} />
          <Button icon onClick={() => this.props.onDelete(this.props.id)}>
            <Icon name='delete' />
          </Button>
        </Form.Group>
      </div>
    )
  }
}

class NetIfsForm extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    let i = 0
    const content = this.props.netifs().map( ({up, connect}) => {
      return (<NetIfaceForm id={i++} up={up} connect={connect} onChange={this.props.onChange} onDelete={this.props.onDelete}/>)
    })

    return (
      <div>
        <label>connect</label> {content}
        <Button icon onClick={this.props.onAdd}>
          <Icon name='add' />
        </Button>
      </div>
    )
  }
}

export default class PropsEditor extends BasePropsEditor {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delSubnet(this.props.id)
  )

  handleSave = () => {
    console.log('click save')
    console.log(this.state)
    this.props.assignSubnet(this.state.name, {load: this.state.load})
    this.props.assignSubnetNetif(this.state.name, JSON.parse(JSON.stringify(this.state.netifs)))
  }

  handleIfaceAdd = () => {
    const newArray = Object.assign([], this.state.netifs);
    newArray.push({ connect: "" })
    //console.log(newArray)
    this.setState(
      { 
        ...this.state,
        netifs: [ 
          ...newArray
        ] 
      }
    )
  }
  handleIfaceDelete = (id) => {
    //console.log('click delete: ' + id)
    const newArray = Object.assign([], this.state.netifs);
    newArray.splice(id, 1)
    this.setState(
      { 
        ...this.state,
        netifs: [ 
          ...newArray
        ] 
      }
    )
  }

  constructor(prop) {
    super(prop)

    this.state = ({
      ...this.state,
      name: this.props.id,
      load: this.props.subnet[this.props.id].load,
      netifs: JSON.parse(JSON.stringify(
                this.props.subnet[this.props.id].netifs
              ))
    })
  }

  handleChange = (e, { name, value }) => {
    if (name === 'connect' || name === 'up') {
      //console.log(e.target.id)
      const newArray = Object.assign([], this.state.netifs);
      newArray[e.target.id] = 
        { 
          ...this.state.netifs[e.target.id], [name]: value
        }
      this.setState(
        { 
          ...this.state,
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
    this.content = (
      <Form>
        <Form.Field>
          <label>Name</label>
          <Form.Input name="name" defaultValue={this.state.name} onChange={this.handleChange} />
        </Form.Field>

        <Divider />

        <Form.Field>
          <label>Load</label>
          <Form.Input name="load" defaultValue={this.state.load} onChange={this.handleChange} />
        </Form.Field>

        <Divider />

        <NetIfsForm 
          netifs={()=> (this.state.netifs)}
          onChange={this.handleChange} 
          onDelete={this.handleIfaceDelete}
          onAdd={this.handleIfaceAdd}
        />

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
