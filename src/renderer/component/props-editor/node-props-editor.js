'use strict'
import React, { Component } from 'react'
import { Table, List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Exception from './exception'
import BasePropsEditor from './base-props-editor'

class NetIfaceForm extends Component {
  // onDelete(this.props.id)
  render() {
    return (
      <Form.Group inline>
        <Form.Input id={this.props.id} name="connect" defaultValue={this.props.connect} onChange={this.props.onChange} />
        <Button icon onClick={() => this.props.onDelete(this.props.id)}>
          <Icon name='delete' />
        </Button>
      </Form.Group>
    )
  }
}

class NetIfsForm extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    let i = 0
    const content = this.props.netifs().map( ({connect}) => {
      return (<NetIfaceForm id={i++} connect={connect} onChange={this.props.onChange} onDelete={this.props.onDelete}/>)
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

export default class NodePropsEditor extends BasePropsEditor {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delNode(this.props.id)
  )

  handleSave = () => {
    //console.log('click save')
    //console.log(this.state)
    this.props.assignNodeNetif(this.state.name, JSON.parse(JSON.stringify(this.state.netifs)))
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
      netifs: JSON.parse(JSON.stringify(
                this.props.node[this.props.id].netifs
              ))
    })
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
