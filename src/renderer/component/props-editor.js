'use strict'
import React from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { 
  Ask,
  BoxPropsEditor,
  NodePropsEditor, 
  SubnetPropsEditor,
  ChannelPropsEditor,
  AppPropsEditor,
  Exception 
} from './props-editor/utils'

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
  titleSuffix = ''

  constructor(prop) {
    super(prop)

    this.state = {
      width: null,
    }
  }

  switchContent(visible, type, id) {
    this.current = this.focus
    const pr = (() => {switch( type ) {
      case 'BOX': 
        return this.props.netState.box[id]
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
      //this.content = <div />
    } else if ( !pr ) {
      const m = ''+ type + ' ' + id + ' is not found';
      return <Exception msg={m}/>

    } else {
      if (type == 'BOX') {
        return <BoxPropsEditor
            handleParent={this} key={type+id} {...this.props} {...this.props.netState} id={id} 
          />
      } else if (type == 'NODE') {
        return <NodePropsEditor
            handleParent={this} key={type+id} {...this.props} {...this.props.netState} id={id}
          />
      } else if (type == 'SUBNET') {
        return <SubnetPropsEditor
            handleParent={this} key={type+id} {...this.props} {...this.props.netState} id={id}
          />
      } else if (type == 'CHANNEL') {
        return <ChannelPropsEditor
            handleParent={this} key={type+id} {...this.props} {...this.props.netState} id={id}
          />
      } else if (type == 'APP') {
        return <AppPropsEditor
            handleParent={this} key={type+id} {...this.props} {...this.props.netState} id={id}
          />
      } else {
        const m = ''+ type + ' is invalided type';
        return <Exception msg={m}/>
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
  handleEditState = ({isSaved}) => {
    if (isSaved) {
      this.titleSuffix = ''
    } else {
      this.titleSuffix = '●'
    }
  }

  render() {
    const { visible, type, id } = this.props.guiState.editor
    this.focus = JSON.stringify({type: type, id: id})
    this.content = this.switchContent(visible, type, id)

    return (
      <div className='props-editor'>
        <Sidebar
          as={Segment}
          animation='overlay'
          direction='right'
          visible={visible}
          width={this.state.width}
        > 
          <div>
            Props editor {this.titleSuffix}
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
