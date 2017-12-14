import React, { Component } from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

class Ask extends Component {
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

class Exception extends Component {
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

class NodePropsEditor extends Component {
  state = { activeItem: 'props' }

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

  editted = this.props.id
  pprops = null
  pdanger = null

  render() {
    const { activeItem } = this.state
    const name       = this.props.id
    const { netifs } = this.props.node[name]

    if ( !this.pprops ) {
      this.pprops = (
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Name' defaultValue={name} />
          </Form.Field>
          <Form.Field>
            <label>Apps</label>
            <input placeholder='myapp, ping, ...' />
          </Form.Field>
          <Button.Group fluid>
            <Button>Revert</Button>
            <Button.Or />
            <Button positive>Save</Button>
          </Button.Group>
        </Form>
      )
    }

    if ( !this.pdanger ) {
      this.pdanger = (
        <Form>
          <Button negative onClick={this.handleDeleteClick}>Delete</Button>
        </Form>
      )
    }

    if (this.editted != name) {
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
        default: return <Exception msg='active tag is invalided!'/>
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

class PropsEditor extends Component {
  hideVisibility = () => this.props.hideProps()
  content = null

  render() {
    const { visible, type, id } = this.props.editor

    const pr = (() => {switch( type ) {
      case 'NODE': 
        return this.props.node[id]
      case 'CHANNEL': 
        return this.props.channel[id]
      default: 
        return false
    }})()

    if ( !visible ) {
    //this.content = <div />
    } else if ( !pr ) {
      const m = ''+ type + ' ' + id + ' is not found in database';
      this.content = <Exception msg={m}/>
    } else {
      this.content = <NodePropsEditor {...this.props} id={id} />
    }

    return (
      <div>
        <Sidebar
          as={Segment}
          animation='overlay'
          direction='right'
          visible={visible}
        > 
          <div>
            Props editor
            <Icon link name='close' onClick={this.hideVisibility} />
          </div>

          <Divider />

          {this.content}
        </Sidebar>
      </div>
    )
  }
}

export default PropsEditor
