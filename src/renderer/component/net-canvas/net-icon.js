// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Text, Layer, Image, Group, Label} from 'react-konva'
import {Filters} from 'konva'
import {Provider} from 'react-redux'

function limitUnit(a, range) {
  if (a < range[0]) {
    return range[0]
  } else if (a > range[1]) {
    return range[1]
  }
  return a
}
function limitPair(xy, range) {
  return [
    limitUnit(xy[0], [range[0][0], range[1][0]]), 
    limitUnit(xy[1], [range[0][1], range[1][1]])
  ]
}

export default class NetIcon extends React.Component {
  // key list of event handler
  HDL_KEYS = ['onClick', 'onDragStart', 'onDragmove', 'onDragend']
  /*
  handler = {
    onClick:     (...args)=>this.props.onClick({x:this.state.x, y:this.state.y}, ...args),
    onDragStart: (...args)=>this.props.onDragStart({x:this.state.x, y:this.state.y}, ...args),
    onDragmove:  (...args)=>this.props.onDragmove({x:this.state.x, y:this.state.y}, ...args),
    onDragend:   (...args)=>this.props.onDragend({x:this.state.x, y:this.state.y}, ...args),
  }
  */

  constructor(prop) {
    super(prop)
    this.state = {
      x: prop.x,
      y: prop.y,
    }
    this.myRef = React.createRef()
    console.log('imageRef:', this.imageRef)
    this.handler = this.HDL_KEYS
      .filter( (key)=>(typeof(this.props[key])=="function"))
      .map( (key)=>({ [key]: (...args)=>this.props[key]({x:this.state.x,y:this.state.y}, ...args) }))
      .reduce( (acc,current)=>Object.assign(acc,current), {})
    console.log(this.handler)

    this.handleLoadImage = () => {
      // resizes from image max-width
      const {width: org_w, height: org_h} = this.image
      //var [width, height] = [45.0, 0.0]
      var [width, height] = [40.0, 0.0]
      height = width*(org_h/org_w)
      this.image.width = width
      this.image.height = height
      this.setState({
        image: this.image,
        offsetX: this.image.width/2,
        offsetY: this.image.height/2,
      })

      this.imageRef.getLayer().batchDraw()
    }
    this.image = new window.Image()
    this.image.src = this.props.image_url
    this.image.addEventListener('load', this.handleLoadImage)

  }

  updateBright(select) {
    if (select) {
      this.imageRef.brightness(-0.1)
      this.imageRef.cache()
    } else {
      this.imageRef.brightness(0)
      this.imageRef.cache()
    }
  }

  componentDidMount() {
    this.updateBright(this.props.select)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.select != this.props.select) {
      this.updateBright(this.props.select)
    }
  }

  onDragBoundFunc = (pos) => {
    const stage = this.myRef.current.findAncestor('Stage')
    const [x, y] = limitPair([pos.x, pos.y], [[0,0], [stage.width(), stage.height()]])
    return { x: x, y: y }
  }

  setImageRef = el => { this.imageRef = el }

  render() {
    return (
      <Group ref={this.myRef}>
      <Label x={this.state.x-this.state.offsetX} y={this.state.y+this.state.offsetY}>
        <Text text={this.props.name} />
      </Label>
      <Image ref={this.setImageRef}
        image={this.state.image}
        draggable={true}
        filters={[Filters.Brighten]}
        brightness={0}
        x={this.state.x}
        y={this.state.y}
        offsetX={this.state.offsetX}
        offsetY={this.state.offsetY}
        dragBoundFunc={(pos)=>{
          pos = this.onDragBoundFunc(pos)
          this.setState(pos)
          if (typeof(this.props.dragBoundFunc)=="function"){
            this.props.dragBoundFunc(pos)
          }
          return pos
        }}
        {...this.handler}
      />
      </Group>
    )
  }
}
