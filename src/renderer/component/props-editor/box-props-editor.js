'use strict'
import React, { Component, useState } from 'react'
import { Dropdown, Table, List, Divider, Container, Message, Button,
  Checkbox, Form, Grid, Header, Icon, Image, Input, Menu, Segment, Sidebar
} from 'semantic-ui-react'
import {Map,fromJS} from 'immutable'

import AceEditor from 'react-ace'
//import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-min-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/snippets/python"

import {Resizable} from 're-resizable'

import Exception from './exception'
import BasePropsEditor from './base-props-editor'

class PortForm extends Component {
  constructor(prop) {
    super(prop)

    this.state = {
      name: '',
      box: '',
      port: '',
      rel: '',
    }
    if (typeof prop.port == 'string')
    {
      this.state.name = prop.port
    }
    else if (typeof prop.port == 'object' &&
             ['name', 'connect'].every(x=>x in prop.port))
    { 
      this.state.name = prop.port.name
      this.state.box  = prop.port.connect[0]
      this.state.port = prop.port.connect[1]
      this.state.rel  = prop.port.rel
    }
  }

  handleChange = (e, v) => {
    const { name, value } = v;
    this.setState({
      ...this.state,
      [name]: value
    }, ()=>{
      // propagation to upper.
      if (this.state.box == '' && this.state.port == '') {
        this.props.onChange(this.props.id, this.state.name)
      } else {
        this.props.onChange(this.props.id, {
          name: this.state.name,
          connect: [this.state.box, this.state.port],
          rel: 'child'
        })
      }
    })

  }

  render() {
    return (
      <div>
        <label>{this.state.name}</label>
        <Form.Group>
          <Form.Field width={8}>
            <Input fluid name="box" placeholder='box'
              disabled={this.state.rel=='parent'}
              value={this.state.box} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field width={8}>
            <Input fluid name="port" placeholder='port'
              disabled={this.state.rel=='parent'}
              value={this.state.port} onChange={this.handleChange} />
          </Form.Field>
        </Form.Group>
      </div>
    )
  }
}

const BoxCodeResizable = (props) => {
  const [editor_size, setEditorSize] = useState({
    width: props.width,
    height: props.height
  })
  //console.log('children resize',props.children)
  return <Resizable
    size={{ width: editor_size.width, height: editor_size.height }}
    enable={{
      top: false,
      right: false,
      bottom: true,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    }}
    onResize={(e, direction, ref, d) => {
      props.onChange()
    }}
    onResizeStop={(e, direction, ref, d) => {
      setEditorSize({
        width: editor_size.width,
        height: editor_size.height + d.height
      })
      props.onChange()
    }}
  >
    {props.children}
  </Resizable>
}

export default class BoxPropsEditor extends BasePropsEditor {
  init = () => {
    console.log('BoxPropsEditor',this.props.box[this.props.id])
    this.state = ({
      ...this.state,
      name: this.props.id,
      ...JSON.parse(JSON.stringify(this.props.box[this.props.id])),
      code: this.props.box[this.props.id].code,
    })
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleDeleteClick = (e) => this.setState(
    // delete box
    this.props.delBox(this.props.id)
  )

  handleRevert = () => {
    this.init()
    this.setState(this.state) // force rerender
  }
  handleSave = () => {
    console.log('click save, BoxPropsEditor.state->', this.state)
    // [TODO] assertion
    // valid new box name wheather it is duplicate to exised box.
    // check whether state.name same to initial name.
    if (this.props.id != this.state.name) {
      // then editor will change name
      // check, new box name wheather it is duplicate to exised box.
      if (this.state.name in this.props.box) {
        // invalid!
        showSaveError("could not to save. due to duplicate box name.");
        return;
      }
    }
    
    // update
    this.props.reconnectBoxPort(this.props.id, JSON.parse(JSON.stringify(this.state.ports)))
    this.props.saveBoxProp(this.props.id, {code: this.state.code})

    // when box name change, copy current box to new box, and delete current box.
    if (this.state.name != this.props.id) {
      this.props.copyBox(this.props.id, this.state.name)
      this.props.delBox(this.props.id)
      this.props.showProps('BOX', this.state.name)
    }
  }

  constructor(prop) {
    super(prop)
    this.init()
  }

  componentWillUnmount() {
    this.props.handleParent.setState({width:null})
  }

  handleChange = (e, v) => {
    this.setState({
      ...this.state,
      [v.name]: v.value
    })
  }
  handlePortChange = (id, v) => {
    var newPorts = this.state.ports
    newPorts[id] = v
    this.setState({
      ...this.state,
      ports: newPorts
    })
  }

  renderPropsForm = () => {
    //this.props.onChange({isSaved: false})
    this.content = (
      <Form>
        <Form.Field>
          <label>Type</label>
          {this.state.type}
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <Form.Input name="name" value={this.state.name} onChange={this.handleChange} />
        </Form.Field>

        <Divider />

        { this.state.ports.map((p,idx)=>
            <PortForm id={idx} key={idx} port={p} onChange={this.handlePortChange} />) }

        <Divider />

        <label>Code (Python3)</label>
        <BoxCodeResizable
          onChange={()=>{this.refs.reactAceComponent.editor.resize()}}
          width='100%'
          height='100px'
        >
          <AceEditor
            onFocus={()=>{
              this.props.handleParent
                .setState({
                  width:'very wide'
                },()=>{
                  this.refs.reactAceComponent.editor.resize()
                })
            }}
            //onBlur={()=>{
            //  this.props.handleParent.setState({width:null})
            //}}
            width='100%'
            height='100%'
            placeholder=""
            mode="python"
            theme="tomorrow"
            name="box-code"
            ref="reactAceComponent"
            onChange={(newValue)=>{
              this.setState({code: newValue})
              this.refs.reactAceComponent.editor.resize()
            }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.code}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}/>
      </BoxCodeResizable>

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
