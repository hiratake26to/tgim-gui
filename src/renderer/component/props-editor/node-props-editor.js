'use strict'
import React, { Component } from 'react'
import { Dropdown, Table, List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Input, Menu, Segment, Sidebar } from 'semantic-ui-react'

import Exception from './exception'
import BasePropsEditor from './base-props-editor'

class NetIfaceForm extends Component {
  // onDelete(this.props.id)

  rolesTbl = [
    {key: 'router', value: "Router", text: "Router"},
    {key: 'switch', value: "Switch", text: "Switch"},
    {key: 'sta', value: "Sta",    text: "Station"},
    {key: 'ap', value: "Ap",     text: "Access Point"},
    {key: 'adhoc', value: "Adhoc",  text: "Adhoc"},
  ];
  
  render() {
    console.log('[this.props.nic] ->', [this.props.nic])

    const connect = this.props.nic.connect;
    const as = this.props.nic.as;

    return (
      <Form>
        <Form.Group>
          <Form.Field width={7}>
            <label>connect</label>
            <Input fluid name="connect" placeholder='Channel' value={connect} onChange={this.props.onChange} idx={this.props.id} />
          </Form.Field>
          <Form.Field width={6}>
            <label>as</label>
            <Dropdown fluid name="as" placeholder='Role' value={as} onChange={this.props.onChange} idx={this.props.id} fluid multiple selection options={this.rolesTbl} />
          </Form.Field>
          <Form.Field width={3}>
            <label>del</label>
            <Button fluid icon onClick={()=>this.props.onDelete(this.props.id)}>
              <Icon name='delete' />
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

class NetIfsForm extends Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    const netifs = this.props.netifs();
    const content = netifs.map( (nic, idx) => {
      return (<NetIfaceForm id={idx} nic={nic} onChange={this.props.onChange} onDelete={this.props.onDelete}/>)
    });
    //console.log('NetIfsForm.content->', content);
    return (
      <div>
        {content}
        <Button icon onClick={this.props.onAdd}>
          <Icon name='add' />
        </Button>
      </div>
    )
  }
}

export default class NodePropsEditor extends BasePropsEditor {
  init = () => {
    this.state = ({
      ...this.state,
      name: this.props.id,
      netifs: JSON.parse(JSON.stringify(
                this.props.node[this.props.id].netifs
              ))
    })
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delNode(this.props.id)
  )

  handleRevert = () => {
    this.init()
    this.setState(this.state) // force rerender
  }
  handleSave = () => {
    console.log('click save, NodePropsEditor.state->', this.state)
    // [TODO] assertion
    // valid new node name wheather it is duplicate to exised node.
    // check whether state.name same to initial name.
    if (this.props.id != this.state.name) {
      // then editor will change name
      // check, new node name wheather it is duplicate to exised node.
      if (this.state.name in this.props.node) {
        // invalid!
        showSaveError("could not to save. due to duplicate node name.");
        return;
      }
    }
    
    // update
    this.props.assignNodeNetif(this.props.id, JSON.parse(JSON.stringify(this.state.netifs)))

    // when node name change, copy current node to new node, and delete current node.
    if (this.state.name != this.props.id) {
      this.props.copyNode(this.props.id, this.state.name)
      this.props.delNode(this.props.id)
      this.props.showProps('NODE', this.state.name)
    }
  }

  handleIfaceAdd = () => {
    const newArray = Object.assign([], this.state.netifs);
    newArray.push({ connect: "" })
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
    this.init()
  }

  handleChange = (e, v) => {
    const { name, value } = v;
    if (name == 'connect' || name == 'as') {
      const { idx } = v;
      const newArray = Object.assign([], this.state.netifs);
      newArray[idx] = 
        { 
          ...this.state.netifs[idx], [name]: value
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
      this.setState({
        ...this.state,
        [name]: value
      })
    }
  }

  renderPropsForm = () => {
    this.content = (
      <Form>
        <Form.Field>
          <label>Name</label>
          <Form.Input name="name" value={this.state.name} onChange={this.handleChange} />
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
          <Button onClick={this.handleRevert}>Revert</Button>
          <Button.Or />
          <Button positive onClick={this.handleSave}>Save</Button>
        </Button.Group>
      </Form>
    )

    return this.content
  }
}
