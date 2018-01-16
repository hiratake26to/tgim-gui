'use strict'
import React from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Ask, NodePropsEditor, SubnetPropsEditor, ChannelPropsEditor, AppPropsEditor, Exception } from './props-editor/utils'

class AskSwitchTarget extends React.Component {
  render() {
    return (
      <Ask msg='Do you want to cancel the current change?'
        onCanncel = {this.props.onCanncel}
        onOk      = {this.props.onOk}
      />
    )
  }
}

class PropsEditor extends React.Component {
  hideVisibility = () => this.props.hideProps()
  content = null
  current = null
  focus = null
  ask = null
  hasChange = false

  switchContent(visible, type, id) {
    this.current = this.focus
    const pr = (() => {switch( type ) {
      case 'NODE': 
        return this.props.netState.node[id]
      case 'SUBNET': 
        return this.props.netState.subnet[id]
      case 'CHANNEL': 
        return this.props.netState.channel[id]
      case 'APP': 
        return this.props.netState.apps[id]
      default: 
        return false
    }})()

    if ( !visible ) {
      //
      //this.content = <div />
    } else if ( !pr ) {
      const m = ''+ type + ' ' + id + ' is not found';
      //this.setState({content: <Exception msg={m}/>})
      this.content = <Exception msg={m}/>
    } else {
      if (type == 'NODE') {
        //this.setState( { content: <NodePropsEditor key={type+id} {...this.props} {...this.props.netState} id={id} /> })
        this.content = <NodePropsEditor key={type+id} {...this.props} {...this.props.netState} id={id} />
      } else if (type == 'SUBNET') {
        //this.setState( { content: <SubnetPropsEditor key={type+id} {...this.props} {...this.props.netState} id={id} /> })
        this.content = <SubnetPropsEditor key={type+id} {...this.props} {...this.props.netState} id={id} />
      } else if (type == 'CHANNEL') {
        //this.setState( { content: <ChannelPropsEditor key={type+id} {...this.props} {...this.props.netState} id={id} /> })
        this.content = <ChannelPropsEditor key={type+id} {...this.props} {...this.props.netState} id={id} />
      } else if (type == 'APP') {
        //this.setState( { content: <ChannelPropsEditor key={type+id} {...this.props} {...this.props.netState} id={id} /> })
        this.content = <AppPropsEditor key={type+id} {...this.props} {...this.props.netState} id={id} />
      } else {
        const m = ''+ type + ' is invalided type';
        //this.setState( { content: <Exception msg={m}/>} )
        this.content = <Exception msg={m}/>
      }
    }
  }

  handleAskOk = () => {
    const { visible, type, id } = this.props.guiState.editor
    this.switchContent(visible, type, id)
  }
  handleAskCanncel = () => {
    const jc = JSON.parse(this.current)
    this.props.showProps(jc.type, jc.id)
  }

  render() {
    const { visible, type, id } = this.props.guiState.editor
    this.focus = JSON.stringify({type: type, id: id})

    if ( !this.hasChange ) {
      this.switchContent(visible, type, id)
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

          { this.current != this.focus
            ? <AskSwitchTarget onOk={this.handleAskOk} onCanncel={this.handleAskCanncel} />
            : false
          }

          <div style={{display: this.current == this.focus ? '' : 'none'}}>
            { this.content }
          </div>
        </Sidebar>
      </div>
    )
  }
}

export default PropsEditor
