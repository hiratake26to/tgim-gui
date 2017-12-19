'use strict'
import React from 'react'
import { List, Divider, Container, Message, Button, Checkbox, Form, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { NodePropsEditor, ChannelPropsEditor, Exception } from './props-editor/utils'

class PropsEditor extends React.Component {
  hideVisibility = () => this.props.hideProps()
  content = null

  render() {
    const { visible, type, id } = this.props.guiState.editor

    const pr = (() => {switch( type ) {
      case 'NODE': 
        return this.props.netState.node[id]
      case 'CHANNEL': 
        return this.props.netState.channel[id]
      default: 
        return false
    }})()

    if ( !visible ) {
    //this.content = <div />
    } else if ( !pr ) {
      const m = ''+ type + ' ' + id + ' is not found';
      this.content = <Exception msg={m}/>
    } else {
      if (type == 'NODE') {
        this.content = <NodePropsEditor {...this.props} {...this.props.netState} id={id} />
      } else if (type == 'CHANNEL') {
        this.content = <ChannelPropsEditor {...this.props} {...this.props.netState} id={id} />
      } else {
        const m = ''+ type + ' is invalided type';
        this.content = <Exception msg={m}/>
      }
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
