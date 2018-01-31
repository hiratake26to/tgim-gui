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

/*
export const initialState = {
  netState: {
    name: "example_net",
    node: {
      X: {
        point: { x: 130, y: 50 },
        netifs: [
          { connect : "link_0" }
        ]
      },
      Y: {
        point: { x: 230, y: 150 },
        netifs: [
          { connect : "link_0" }
        ]
      },
      Z: {
        point: { x: 330, y: 250 },
        netifs: [
          { connect : "link_0" }
        ]
      }
    },
    channel: {
      link_0: {
        point: { x: 30, y: 50 },
        type: "PointToPoint",
        config: {
          Delay : "2ms",
          DataRate : "3Mbps"
        }
      }
    },
    "subnet" : {
      "subnet_0" : {
        point: { x: 100, y: 100 },
        "load" : "./local/subnet0.json",
        "netifs" : [
          { "up" : "gateway", "connect" : "link_0" }
        ]
      },
      "subnet_1" : {
        point: { x: 100, y: 100 },
        "load" : "./local/subnet1.json",
        "netifs" : [
          { "up" : "gateway", "connect" : "link_0" }
        ]
      }
    },
    "apps" : {
      "tcp_app2" : {
        "type": "setMyTcpApp",
        "args": {
          "src_host":  "X",
          "src_port":  60000,
          "dst_host":  "Y",
          "dst_port":  80,
          "sim_start": 5,
          "sim_stop":  25,
          "rate":      "1Mbps"
        }
      },
      "tcp_app" : {
        "type": "setMyTcpApp",
        "args": {
          "src": { "host": "X", "port": 60000 },
          "dst": { "host": "Y", "port": 80 },
          "sim": { "start": 5, "stop": 25 },
          "opt": { "rate": "1Mbps" }
        }
      }
    }
  },
  guiState: {
    line: {},
    editor: {}
  }
}
*/
