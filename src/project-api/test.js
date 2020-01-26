'use strict'

import ProjectAPI from '.'

const path = '/home/ubuntu-zioi/Desktop/tgim/test-pro2'
const project = new ProjectAPI(path)

console.log(project.isExist())

project.create({ns3dir: '/home/ubuntu-zioi/local/opt/ns3/ns-allinone-3.30.1/ns-3.30.1'})
  .then((ret)=>console.log(ret))
  .catch((error)=>{
    console.log('Failed to create new project!')
    console.log(error)
  })

project.updateSync(
  {}
//  {netState: { "name": "initialNet", "box": { "_box0": { "type": "Terminal", "ports": [ { "name": "port", "connect": [ "_box2", "port0" ], "rel": "child" } ], "point": { "x": 108, "y": 144 }, "code": "(this.Sdl()\n.At(Sig(\"SimReady\")).Aft()\n  .At(0).Do(\"Ping\", {'dhost': _box1.AsHost()})\n.EndAft())" }, "_box1": { "type": "Terminal", "ports": [ { "name": "port", "connect": [ "_box2", "port1" ], "rel": "child" } ], "point": { "x": 314, "y": 149 }, "code": "(this.Sdl()\n.At(Sig(\"SimReady\")).Aft()\n  .At(0).Do(\"Sink\", {})\n.EndAft())" }, "_box2": { "type": "Switch", "ports": [ { "name": "port0", "connect": [ "_box0", "port" ], "rel": "parent" }, { "name": "port1", "connect": [ "_box1", "port" ], "rel": "parent" }, "port2", "port3", "port4", "port5", "port6", "port7" ], "point": { "x": 201, "y": 87 }, "code": "" } }, "node": {}, "subnet": {}, "channel": {}, "apps": {} }}
  )

console.log(project.readSync())
