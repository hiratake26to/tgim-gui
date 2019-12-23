'use strict'

export const defaultNetState = {
  name: 'initialNet',
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
  }
}
