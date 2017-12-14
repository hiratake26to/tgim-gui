'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Image, Group} from 'react-konva'
import {Provider} from 'react-redux'


export default class NetNode extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = {
      image: null,
      id: prop.id,
      x: prop.x,
      y: prop.y,
      connect: {
        link_0: {
          point: { x: 30, y: 50 },
          type: "PointToPoint",
          config: {
            Delay : "2ms",
            DataRate : "3Mbps"
          }
        }
      }
    }

  }

  componentDidMount() {
    const image = new window.Image()
    image.src = 'img/Pc.png'
    image.onload = () => {
      this.setState({
        image: image,
        offsetX: image.width/2,
        offsetY: image.height/2
      })
    }
    this.reline = () => {
      Object.keys(this.state.connect).forEach( key => {
        //console.log('reline: '+this.props.id+'_to_'+key)
        this.props.delLine(this.props.id+'_to_'+key)
        this.props.addLine(this.props.id+'_to_'+key,
                            { type: 'NODE', id: this.props.id},
                            { type: 'CHANNEL', id: key})
        //console.log(this.props.line)
      })
    }
    this.reline()
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
        onClick={() => this.props.showProps('NODE', this.state.id)}
        onDragStart={(e) => {
          //this.props.addLine(this.props.id+'~', {type: 'NODE', id: this.props.id}, {type: 'NODE', id: this.props.id})
        }}
        onDragend={(e) => {
          //var x = e.evt.layerX
          //var y = e.evt.layerY
          //this.props.handleDragend(this.state.id, x, y)
          //this.reline()
        }}
      />
    )
  }
}
