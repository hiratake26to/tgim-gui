// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'

export const defaultProjectState = {
  path: ""
}

export const defaultNetState = {
  name: 'initialNet',
  box: {},
  node: {},
  subnet: {},
  channel: {},
  apps : {}
}

export const defaultGuiState = {
  line: {},
  editor: {},
  selector: {},
  work_dir: "",
}

export function defaultBoxProp(box_list, name) {
  console.log('de3bug',box_list, name)
  return {
    ...box_list[name],
    point: { x: 100, y: 100 },
    code: [`(this.Sdl()`
      ,`.At(Sig("SimReady")).Aft()`
      ,`  #.At(0).Do("Ping", {'dhost': dst.AsHost()})`
      ,`.EndAft())`
    ].join('\n')
  }
}
export const defaultNodeProp = {
  point: { x: 100, y: 100 },
  netifs: []
}
export const defaultSubnetProp = {
  point: { x: 100, y: 100 },
  load: undefined,
  netifs: []
}

export const defaultChannelProp = {
  point: { x: 50, y: 50 },
  //type: "PointToPoint",
  type: "Csma",
  config: {
    Delay : "1ms",
    DataRate : "100Mbps"
  }
}

export const defaultLineProp = {
  first: {
    type: undefined, // 'NODE' or 'CHANNEL'
    id: undefined
  },
  second: {
    type: undefined,
    id: undefined
  }
}

export const defaultAppProp = {
  type: undefined,
  args: {}
}

export const initialState = {
  netState: {
    ...defaultNetState
  },
  guiState: {
    ...defaultGuiState
  },
  projectState: {
    ...defaultProjectState
  }
}
