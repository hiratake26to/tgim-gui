'use strict'
import {
  app, BrowserWindow, Tray,
  ipcMain, dialog,
  nativeImage
} from 'electron'
import {name, version} from '../package.json'
app.name = name
app.getVersion = ()=> version
import parseArgs from 'electron-args'
import icon from '../assets/icon/icon64x64.png'
import {resolve, join, isAbsolute} from 'path'
//import * as url from 'url'

global.project = null
global.ns3dir = '/home/ubuntu-zioi/local/opt/ns3/ns-allinone-3.30.1/ns-3.30.1'

//////////////////////////////
// main

let win

function createWindow(path) {
//function createWindow() {
  win = new BrowserWindow({
    width: 1000, height: 600,
    icon: nativeImage.createFromPath(icon),
    webPreferences: {
      nodeIntegration: true
    }
  })

  /*
  win.loadURL(url.format({
    pathname : path.join(__dirname, 'index.html'),
    protocol : 'file:',
    slashes  : true
  }))
  */
  win.loadURL('file://' + __dirname + '/index.html')

  //win.webContents.openDevTools()
  //win.webContents.closeDevTools()
  //win.setMenu(null)

  win.on('closed', () => {
    win = null
  })

  //if (argv.file) {
  //  win.webContents.on('did-finish-load', () => {
  //    win.webContents.send('open', argv.file)
  //  })
  //}
  if (path) {
    win.webContents.on('did-finish-load', () => {
      global.project = new ProjectAPI(path)
      //global.project.create({ns3dir: global.ns3dir})

      win.webContents.send('open-project', {
        path: path,
        payload: project.readSync(),
      })

    })
  }
}

// parse args
/*
function parseArgs() {
  //console.log(process.argv)
  
  // issue refer to https://github.com/yargs/yargs/issues/781
  //import yargs from 'yargs/yargs'
  import('yargs/yargs').then( (yargs) => {
    const argv = yargs(process.argv.slice(1))
      .usage('$0', 'open empty project')
      .command('open <file>', 'open the file', (yargs) => {
        yargs.positional('file', {
          describe: 'DSL file (.json)',
          type: 'string'
        })
      })
      .argv

    createWindow(argv)
  })
}
*/
const cli = parseArgs({
  help: `
  ${app.name}

  Usage
    $ ${app.name} [path]

  Options
    --help           show help
    --version        show version
    --workdir <path> set working directory path

  Examples
    $ ${app.name} /path/to/tgim/project/
    $ ${app.name} /path/to/tgim/nsom.json
  `,
  version: `${app.name} ${app.getVersion()}`
}, {
  alias: {
    h: 'help'
  },
  default: {
    auto: false
  },
});

// debug CLI args
//console.log(cli.flags);
//console.log(cli.input[0]);

//app.on('ready', parseArgs)
app.on('ready', ()=>{
  if (cli.input[0]) {
    // FIXME 

    var path = resolve(join(cli.flags['workdir'], cli.input[0])) // resolve project path
    if (isAbsolute(cli.input[0])) path = cli.input[0] // resolve project path
    //console.log('project path:', path)
    createWindow(path)
  } else {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('active', () => {
  if (win == null) {
    createWindow()
  }
})

//////////////////////////////
// IPC

import ProjectAPI from './project-api'

async function CloseProjectDialog() {
  // check current project
  if (global.project) {
    const result = dialog.showMessageBoxSync(win, {
      type: "question",
      buttons: ["Without saving", "Cancel"],
      defaultId: 1,
      message: "Already opened the project. Close without saving?"
    })
    if (result===1)
      throw new Error("open project canceled, due to already opened a project")
  }
}

async function handleNewProject(event, arg) {
  await CloseProjectDialog()
  const path = dialog.showSaveDialogSync(win, {
    title: 'New Project',
  })

  if (!path) {
    throw new Error("new project is canceled, due to no specified a path")
  }

  global.project = new ProjectAPI(path)
  await global.project.create({ns3dir: global.ns3dir})

  return {
    path: path,
    ns3dir: ns3dir,
  }
}
async function handleOpenProject(event, arg) {
  await CloseProjectDialog()

  const [path] = dialog.showOpenDialogSync(win, {
    title: 'Open Project',
    properties: ['openDirectory']
  })

  global.project = new ProjectAPI(path)
  //await global.project.create({ns3dir: global.ns3dir})

  return {
    path: path,
    payload: project.readSync(),
  }
}
async function handleSaveAsProject(event, arg) {
  const {netState} = arg
  const {ns3dir} = await handleNewProject(event, arg)

  if (!global.project) throw new Error('Project is not opened!')
  global.project.updateSync({netState: netState})

  //console.log('handleSaveAsProject debug:', project.config.path)
  return {
    path: project.config.path,
    ns3dir: ns3dir,
  }
}
async function handleSaveProject(event, arg) {
  const {netState} = arg

  if (!global.project) throw new Error('Project is not opened!')
  global.project.updateSync({netState: netState})

  //console.log('handleSaveProject debug:', project.config.path)
  return {
    path: project.config.path
  }
}
async function handleRunProject(event, arg) {
  const {netState} = arg

  if (!global.project) throw new Error('Project is not opened!')
  win.webContents.send('begin-run-project')
  const state = await global.project.run(out=>{
    win.webContents.send('build-run-log', out)
  })
  win.webContents.send('end-run-project', state)

  return state
}
async function handleCloseProject(event, arg) {
  await CloseProjectDialog()

  global.project = null

  return {
    path: '',
  }
}

ipcMain.handle('new-project', handleNewProject)
ipcMain.handle('open-project', handleOpenProject)
ipcMain.handle('save-project', handleSaveProject)
ipcMain.handle('save-as-project', handleSaveAsProject)
ipcMain.handle('run-project', handleRunProject)
ipcMain.handle('close-project', handleCloseProject)

import {getbox} from './boxapi'
import {Map,fromJS} from 'immutable'

ipcMain.handle('get-box', async ()=>{
  const ret = await getbox()
//{
//  "Box":         {"type": "BasicBox",         "ports":[]},
//  "RouteSwitch": {"type": "BasicRouteSwitch", "ports":["gw", "port0", "port1"]},
//  "Router":      {"type": "BasicRouter",      "ports":["gw", "lan0", "lan1", "lan2", "lan3"]},
//  "Switch":      {"type": "BasicSwitch",      "ports":["port0", "port1", "port2", "port3"]},
//  "Terminal":    {"type": "BasicTerminal",    "ports":["port"]}
//]
  const a = fromJS(ret)
    .map(x=>({[x.get('name')]: x.remove('name')}))
    .reduce((acc,v)=>acc.merge(v),fromJS({}))
    .toJS()
  return a
})
