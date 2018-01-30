'use strict'
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
import * as fs from 'fs'

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

function createWindow(argv) {
  win = new BrowserWindow({width: 1000, height: 600})

  win.loadURL(url.format({
    pathname : path.join(__dirname, 'index.html'),
    protocol : 'file:',
    slashes  : true
  }))

  //win.webContents.openDevTools()
  //win.webContents.closeDevTools()
  //win.setMenu(null)

  win.on('closed', () => {
    win = null
  })

  if (argv.file) {
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('open', argv.file)
    })
  }
}

app.on('ready', parseArgs)

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

