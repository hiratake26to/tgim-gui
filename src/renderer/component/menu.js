'use strict'
import React from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'
import { remote } from 'electron'
import * as fs from 'fs'

class AppMenu extends React.Component {
  onNew = () => {
    this.props.initAllState()
  }

  onOpen = () => {
    const path = remote.dialog.showOpenDialog( {
      filters: [
        { name: 'tgim-file(.json)', extensions: ['json'] }
      ]
    })

    if ( path ) {
      console.log('open "' + path[0] + '"')
      const data = JSON.parse( fs.readFileSync(path[0]) )
      this.props.initAllState()
      this.props.setNetState(data)
    } else {
      console.log('open cancel')
    }
  }

  onSave = () => {
    const path = remote.dialog.showSaveDialog( {
      filters: [
        { name: 'tgim-file(.json)', extensions: ['json'] }
      ]
    })

    if ( path ) {
      console.log('save to "' + path + '"')
      console.log(this.props.netState)
      fs.writeFileSync(path, JSON.stringify(this.props.netState, null, 2), 'utf8')
    } else {
      console.log('save cancel')
    }
  }

  onGen = () => {
    const path = require('path')
    let save_dir = remote.dialog.showOpenDialog( {
      properties: ['openDirectory']
    })

    if ( !save_dir || !save_dir[0] ) return
    save_dir = path.join(save_dir[0], '/')

    // generate temporary file
    const temp_path = './temp/' + this.props.netState.name + '.json'
    if ( fs.existsSync(temp_path) ) {
      const ret = remote.dialog.showMessageBox({
        type:    'warning',
        buttons: ['OK','Cancel'],
        message: "Already exists temporary file that may be used by other processes.\n"
                 + "Are you really want to continue?"
      })
      if ( ret === 1 ) return
    }
    console.log('generate temporary file to "' + temp_path + '"')
    console.log(this.props.netState)
    fs.writeFileSync(temp_path, JSON.stringify(this.props.netState, null, 2), 'utf8')

    // generate and save for ns3 code
    console.log('save to "' + save_dir + '"')
    const { spawn } = require('child_process')
    const { gen_path, gen_flags } = require('../../config.js')
    const in_files = [
      path.join(temp_path)
    ]
    const args = ['--output-dir', save_dir, ...gen_flags, ...in_files]
    // debug message
    console.log(`gen_path="${gen_path}"`)
    console.log(`gen_flags="${gen_flags}"`)
    console.log(`in_files="${in_files}"`)
    console.log(`args=[${args}]`)

    // run generator
    const gen_cpro = spawn(gen_path, args)
    gen_cpro.stdout.on('data', (data) => {console.log(''+data)})
    gen_cpro.stderr.on('data', (data) => {console.log(''+data)})
    gen_cpro.on('close', (code) => {
      console.log(`generator process exited with code ${code}`);
      // if success: remove temporary file
      if (code === 0) fs.unlinkSync(temp_path)
    })
  }

  render() {
    return (
      <div>
        <Menu attached='top'>
          <Dropdown item icon='wrench' simple>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onNew}>New</Dropdown.Item>
              <Dropdown.Item onClick={this.onOpen}>Open</Dropdown.Item>
              <Dropdown.Item onClick={this.onSave}>Save</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Export</Dropdown.Header>
              <Dropdown.Item onClick={this.onGen}>Generate ns3 code</Dropdown.Item>
              <Dropdown.Item>Save as picture</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    )
  }
}

export default AppMenu
