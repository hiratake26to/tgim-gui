// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
import {PythonShell} from 'python-shell'
import getboxpy from './get_box.py'
import path from 'path'

export function getbox() {
  const pyshell = new PythonShell(getboxpy)

  return new Promise(resolve=>{
    pyshell.on('message', (message)=>{
      const data = JSON.parse(message)
      resolve(data)
    })

    pyshell.end((err,code,signal)=>{
      if (err) throw err
      //console.log('finished')
    })
  })
}
