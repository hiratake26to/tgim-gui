'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Image, Group} from 'react-konva'

export default class NetChannel extends React.Component {
  constructor(prop) {
    super(prop)

    this.state = {
      image: null,
      id: prop.id,
      x: prop.x,
      y: prop.y,
    }
  }

  componentDidMount() {
    const image = new window.Image()
    image.src = 'img/Hub.png'
    image.onload = () => {
      this.setState({
        image: image,
        offsetX: image.width/2,
        offsetY: image.height/2
      })
    }
  }

  render() {
    return (
      <Image
        image={this.state.image}
        draggable={true}
        x={this.state.x}
        y={this.state.y}
        offsetX={this.state.offsetX}
        offsetY={this.state.offsetY}
        dragBoundFunc={(pos) =>{
          this.state.x = pos.x
          this.state.y = pos.y
          this.props.handleDragend(this.state.id, this.state.x, this.state.y)
          return {
              x: pos.x,
              y: pos.y
          }
        }}
        onClick={() => this.props.showProps('CHANNEL', this.state.id)}
        onDragend={(e) => {
          // TODO: if out of the canvas area, it necessary to keep points within area.
          //var x = e.evt.layerX
          //var y = e.evt.layerY
        }}
      />
    )
  }
}
