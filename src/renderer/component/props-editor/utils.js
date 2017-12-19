'use strict'
import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export class Ask extends Component {
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

export class Exception extends Component {
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

export class BasePropsEditor extends Component {
  state = { activeItem: 'props' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  editted = this.props.id
  pprops = null
  pdanger = null

  render() {
    const { activeItem } = this.state

    if ( !this.pprops ) {
      this.pprops = this.renderPropsForm()
    }

    if ( !this.pdanger ) {
      this.pdanger = (
        <Form>
          <Button negative onClick={this.handleDeleteClick}>Delete</Button>
        </Form>
      )
    }

    if (this.editted != this.props.id) {
      return (
        <Ask msg='Do you want to cancel the current change?'
          onCanncel = {this.handleAskCanncel}
          onOk      = {this.handleAskOk}
        />
      )
    }

    const content = (()=>{

      switch (activeItem) {
        case 'props': return this.pprops
        case 'danger': return this.pdanger
        default: return <Exception msg='active tab is invalided!'/>
      }
      
    })()


    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='props' active={activeItem === 'props'} onClick={this.handleItemClick} />
          <Menu.Item name='danger' active={activeItem === 'danger'} onClick={this.handleItemClick} />
        </Menu>

        {content}

      </div>
    )
  }
}

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

export class NodePropsEditor extends BasePropsEditor {
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

export class ChannelPropsEditor extends BasePropsEditor {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    this.props.delChannel(this.props.id)
  )
  handleAskCanncel = () => this.props.showProps('CHANNEL', this.editted)
  handleAskOk      = () => {
    this.editted = this.props.id
    delete this.pprops
    delete this.pdanger
    this.props.showProps('CHANNEL', this.editted)
  }

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
