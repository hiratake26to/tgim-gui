'use strict'

import util from 'util'
import child_process from 'child_process'
import BoxCode from '../boxcode'
import fs from 'fs'
import path from 'path'

const exec = util.promisify(child_process.exec)

export default class ProjectAPI {
  // path is must be absolute!
  constructor(path) {
    this.config = {
      path: path,
      param: ''
    }

  }

  //async run(callback) {
  run(callback) {
    const cmd = `cd '${this.config.path}' && tgim-pack run`

    return new Promise((resolve, reject)=>{
      callback({stdout: '$ '+cmd})
      const bat = child_process.spawn(cmd, {shell:true})
      bat.stdout.on('data', (data)=>{
        //console.log(data.toString())
        callback({stdout: data.toString()})
      })
      bat.stderr.on('data', (data)=>{
        //console.log(data.toString())
        callback({stderr: data.toString()})
      })
      bat.on('close', (code)=>{
        callback('exit code: '+code)
        resolve(code)
      })
    })

    //return await exec(cmd)
  }

  isExist(path='') {
    if (!path) {
      return fs.existsSync(this.config.path) &&
        fs.statSync(this.config.path).isDirectory()
    }
    return fs.existsSync(path)
  }

  async create(args={}) {
    if (args.ns3dir) {
      this.config.param = `--ns3dir='${args.ns3dir}'`
    }
    if (this.isExist()) throw "Error! Already exists a project at the path"

    const cmd = `tgim-pack new '${this.config.path}' ${this.config.param}`
    //console.log('==>', cmd)
    return await exec(cmd)
  }
  readSync() {
    if (!this.isExist())
      throw new Error("Could not read, due to no found the project at the path")

    const file_path = path.join(this.config.path, 'src', `initialNet.json`)
    if (!this.isExist(file_path))
      throw new Error(`Could not read "${file_path}"`)

    const netState = JSON.parse(fs.readFileSync(file_path))

    return {netState: netState}
  }
  writeSync(props, overwrite=false) {
    if (!this.isExist())
      throw new Error("Could not write, due to no found the project at the path")

    var writeHelper=(netState)=>{
      // generate NSOM file from netState
      const file_path = path.join(this.config.path, 'src', `${netState.name}.json`)
      if (!overwrite && this.isExist(file_path))
        throw new Error(`Already exists file "${file_path}"`)
      //console.log('save to: ', file_path)
      fs.writeFileSync(file_path, JSON.stringify(netState,null,2))

      // generate main.py
      const box_code = new BoxCode(netState)
      const main_file = path.join(this.config.path, 'src', 'main.py')
      if (!overwrite && this.isExist(main_file))
        throw new Error(`Already exists file "${main_file}"`)
      box_code.generate(
        x=>fs.writeFileSync(main_file, x)
      )
    }

    if (!props.netState)
      throw new Error("props has no contains netState")
    writeHelper(props.netState)
  }
  updateSync(props) {
    var ret = {}
    try {
      ret = this.readSync()
    } catch(e) {
      //console.log('create new file')
    }
    this.writeSync({
      ...ret,
      ...props
    }, true)
  }
}
