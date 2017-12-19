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
    }
  }


  line_list = []
  last_netifs = null
  interval_id = null
  reline = () => {
    if ( !this.props.node[this.state.id] ) return
    const {netifs} = this.props.node[this.state.id]
    if ( JSON.stringify(netifs) === this.last_netifs ) return
    this.last_netifs = JSON.stringify(netifs)

    console.log('ReLine: ' + this.state.id)
    //console.log(this.line_list)
    this.line_list.map( line_name => {
      this.props.delLine(line_name)
    })
    this.line_list = []
    netifs.forEach( obj => {
    //console.log('reline: '+this.props.id+'_to_'+key)
    this.props.addLine(this.props.id+'_to_'+obj.connect,
                        { type: 'NODE', id: this.props.id},
                        { type: 'CHANNEL', id: obj.connect})
    this.line_list.push(this.props.id+'_to_'+obj.connect)
    //console.log(this.props.line)
    })
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

    // line setter
    this.interval_id = setInterval( this.reline, 100 )
  }

  componentWillUnmount() {
    clearInterval( this.interval_id )
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
        onClick={ () => 
          {
            this.props.showProps('NODE', this.state.id)
            //this.reline();
          }
        }
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
