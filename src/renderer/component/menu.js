'use strict'
import React from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'
import { remote, ipcRenderer } from 'electron'
import { Map, fromJS } from 'immutable'
import * as fs from 'fs'
import * as libpath from 'path'

class AppMenu extends React.Component {
  constructor(prop) {
    super(prop)
  }
  newFile = () => {
    this.props.initAllState()
  }

  openFile = () => {
    const [path] = remote.dialog.showOpenDialogSync( {
      filters: [
        { name: 'tgim-file(.json)', extensions: ['json'] }
      ]
    })

    if ( path ) {
      console.log('open "' + path + '"')
      const data = JSON.parse( fs.readFileSync(path) )
      this.props.initAllState()
      this.props.setNetState(data)
      console.log(`change working directory in "${libpath.dirname(path)}".`)
      this.props.changeWorkDir(libpath.dirname(path))
    } else {
      console.log('open cancel')
    }
  }

  saveFile = () => {
    var path = remote.dialog.showSaveDialogSync( {
      filters: [
        { name: 'tgim-file(.json)', extensions: ['json'] }
      ]
    })

    if ( path ) {
      // check extension whether '.json'
      if (!path.match(/\.json$/)) {
        path += '.json'
        // check duplicate
        if (fs.existsSync(path)) {
          const bt_idx = remote.dialog.showMessageBox({
            type: 'question',
            buttons: ['Cancel', 'Replace'],
            message: `A file named "${libpath.basename(path)}" already exists. Do you want to replace it?`,
            detail: `The file already exists in "${path}". Replacing it will overwrite its contents.`
          })
          if (bt_idx != 1) {
            return; // abort
          }
        }
      }
      console.log('save to "' + path + '"')
      console.log(this.props.netState)
      fs.writeFileSync(path, JSON.stringify(this.props.netState, null, 2), 'utf8')
    } else {
      console.log('save cancel')
    }
  }

  onGen = () => {
    let save_dir = remote.dialog.showOpenDialogSync( {
      properties: ['openDirectory']
    })

    if ( !save_dir || !save_dir[0] ) return
    save_dir = libpath.join(save_dir[0], '/')

    // generate temporary file
    if ( !fs.existsSync('temp') ) {
      try {
        fs.mkdirSync('temp')
      } catch (e) {
        console.error('Could not `mkdir temp`.')
        return 1
      }
    }

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
    const { gen_path, gen_flags } = require('../../config.js')
    const in_files = [
      libpath.join(temp_path)
    ]
    const args = ['--output-dir', save_dir, ...gen_flags, ...in_files]
    // debug message
    console.log(`gen_path="${gen_path}"`)
    console.log(`gen_flags="${gen_flags}"`)
    console.log(`in_files="${in_files}"`)
    console.log(`args=[${args}]`)

    { // run generator
      const { spawn } = require('child_process')
      const gen_cpro = spawn(gen_path, args)
      gen_cpro.stdout.on('data', (data) => {console.log(''+data)})
      gen_cpro.stderr.on('data', (data) => {console.log(''+data)})
      gen_cpro.on('close', (code) => {
        console.log(`generator process exited with code ${code}`);
        // if success: remove temporary file
        if (code === 0) {
          fs.unlinkSync(temp_path)
          console.log('Success!')
        } else {
          console.error('Generator has error')
        }
      })
      gen_cpro.on('error', (e) => {
        console.error('Could not spawn process `' + gen_path + '`.')
        console.error('Check your generator path.')
      })
    }

  }

  onGen2 = () => {
    const box = this.props.netState.box
    console.log('menu generage box', box)
  }

  onPack = () => {
    const { pack_path } = require('../../config.js')

    { // run packager
      const { spawn } = require('child_process')
      const gen_cpro = spawn(pack_path, ['pack'], { cwd: this.props.guiState.work_dir })
      gen_cpro.stdout.on('data', (data) => {console.log(''+data)})
      gen_cpro.stderr.on('data', (data) => {console.log(''+data)})
      gen_cpro.on('close', (code) => {
        console.log(`packager process exited with code ${code}`);
        // if success: remove temporary file
        if (code === 0) {
          console.log('Success!')
        } else {
          console.error('Packager has error')
        }
      })
      gen_cpro.on('error', (e) => {
        console.error('Could not spawn process `' + gen_path + '`.')
        console.error('Check your packager path.')
      })
    }

  }

  saveAsPicture = () => {
    console.log('saveAsPicture')
    console.log(this.props.guiState)
    console.log(this.props.guiState.canvas)

    const downloadURI = (uri, name) => {
      const link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    const stageRef = this.props.guiState.canvas
    const dataURL = stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 0,
      pixelRatio: 2
    })
    downloadURI(dataURL,"canvas-screen-shot")
  }

  saveAsProject = ()=>{
    ipcRenderer
      .invoke('save-as-project', {netState: fromJS(this.props.netState).toJS()})
      .then((result)=>{
        console.log('saveAsProject Success!', result)
        this.props.setProjectPath(result.path)
      })
  }
  newProject = ()=>{
    ipcRenderer
      .invoke('new-project')
      .then((result)=>{
        console.log('newProject Success!', result)
        this.props.initAllState()
        this.props.setProjectPath(result.path)
      })
  }
  openProject = ()=>{
    ipcRenderer
      .invoke('open-project')
      .then((result)=>{
        console.log('openProject Success!', result)
        this.props.initAllState()
        this.props.setNetState(result.payload.netState)
        this.props.setProjectPath(result.path)
      })
  }
  saveProject = ()=>{
    ipcRenderer
      .invoke('save-project', {netState: fromJS(this.props.netState).toJS()})
      .then((result)=>{
        console.log('saveProject Success!', result)
        this.props.setProjectPath(result.path)
      })
  }
  runProject = ()=>{
    ipcRenderer
      .invoke('run-project', {})
      .then((result)=>{
        console.log('runProject Success!', result)
      })
  }
  closeProject = ()=>{
    ipcRenderer
      .invoke('close-project', {})
      .then((result)=>{
        console.log('closeProject Success!', result)
        this.props.initAllState()
        this.props.setProjectPath('')
      })
  }

  render() {
    const isProjectOpen = this.props.projectState.path===''
    return (
      <div>
        <Menu attached='top'>
          <Dropdown item icon='wrench' simple>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.newProject}>New Project</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.openProject}>Open Project</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item disabled={!isProjectOpen} onClick={this.saveAsProject}>Save As Project</Dropdown.Item>
              <Dropdown.Item disabled={isProjectOpen} onClick={this.saveProject}>Save Project</Dropdown.Item>
              <Dropdown.Item onClick={this.saveAsPicture}>Save as picture</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item disabled={isProjectOpen} onClick={this.runProject}>Build&Run Project</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item disabled={isProjectOpen} onClick={this.closeProject}>Close Project</Dropdown.Item>
              {/*
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.newFile}>New</Dropdown.Item>
              <Dropdown.Item onClick={this.openFile}>Open</Dropdown.Item>
              <Dropdown.Item onClick={this.saveFile}>Save</Dropdown.Item>
              */}
              {/*
              <Dropdown.Header>Export</Dropdown.Header>
              <Dropdown.Item onClick={this.onGen2}>Generate ns3 code(dev-ver)</Dropdown.Item>
              <Dropdown.Item onClick={this.onGen}>Generate ns3 code(old-ver)</Dropdown.Item>
              <Dropdown.Item onClick={this.onPack}>Package</Dropdown.Item>
              */}
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    )
  }
}

export default AppMenu
