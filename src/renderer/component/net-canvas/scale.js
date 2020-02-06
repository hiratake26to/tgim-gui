// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Text, Line, Layer, Stage, Group, Rect} from 'react-konva'
import {Map, fromJS} from 'immutable'

export class NetScale extends Component {
  render() {
    const unit = 'm'
    const scale = 10;
    const color = "gray";
    const base = { x: this.props.x, y: this.props.y };
    const ind = (x, y, enableLabel, width = 0) => {
      const label = `${x / scale}`;
      return (
        <Group>
          {enableLabel ? (
            <Text
              x={base.x + x - label.length * 4}
              y={base.y + y - 20}
              text={label}
              fill={color}
            />
          ) : null}
          <Line
            strokeWidth={width}
            x={base.x + width / 2}
            y={base.y + y}
            points={[x, -5, x, 0]}
            stroke={color}
          />
        </Group>
      );
    };
    return (
      <Group>
        <Line x={base.x} y={base.y} points={[0, 0, 100, 0]} stroke={color} />
        <Line
          x={base.x}
          y={base.y - 10}
          points={[0, 0, 100, 0]}
          stroke={color}
        />
        {[
          ind(0, 0, false, 10),
          ind(20, 0, false, 10),
          ind(40, 0, false, 10),
          ind(50, 0, false),
          ind(100, 0, false)
        ]}
        {[
          ind(0, -5, true),
          ind(10, -5, false, 10),
          ind(30, -5, false, 10),
          ind(50, -5, true, 50),
          ind(100, -5, true)
        ]}
        <Text x={base.x + 108} y={base.y - 25} fill={color} text='m' />
      </Group>
    );
  }
}

export class NetScaleSimple extends Component {
  render() {
    const scale = 10
    const color = 'gray'
    const base = { x: this.props.x, y: this.props.y }
    const ind = (x, enableLabel) => {
      const label = `${x / scale}`
      return (
        <Group>
          {enableLabel ? (
            <Text
              x={base.x + x - label.length * 4}
              y={base.y - 20}
              text={label}
              fill={color}
            />
          ) : null}
          <Line x={base.x} y={base.y} points={[x, -5, x, 1]} stroke={color} />
        </Group>
      )
    }
    return (
      <Group>
        <Line x={base.x} y={base.y} points={[0, 0, 100, 0]} stroke={color} />
        {[
          ind(0, true),
          ind(10),
          ind(20),
          ind(30),
          ind(40),
          ind(50, true),
          ind(100, true)
        ]}
      </Group>
    )
  }
}
