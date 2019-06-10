'use strict'
const {app, BrowserWindow} = require('electron')
//import * as path from 'path'
//import * as url from 'url'

let win

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

//function createWindow(argv) {
function createWindow() {
  win = new BrowserWindow({
    width: 1000, height: 600,
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
}

//app.on('ready', parseArgs)
app.on('ready', createWindow)

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

