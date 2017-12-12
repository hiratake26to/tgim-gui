'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Group} from 'react-konva'
import NetLine from './net-line'

export default class NetLines extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    //console.log('NetLines: render')
    return (
      <Group>
        {Object.keys(this.props.line).map( (key) => {
          //console.log('NetLines: line render')
          //console.log(key)
          var l = this.props.line[key]
          return (
            <NetLine
              key    = {key}
              id     = {key}
              first  = {l.first}
              second = {l.second}
              node={this.props.node} channel={this.props.channel} line={this.props.line}
            />
          )
        })}
      </Group>
    )
  }

}

