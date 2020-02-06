// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import '../../assets/default.css'
import '@primer/octicons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import {VisibleToolBox} from './container/VisibleToolBox'
import {VisibleNetwork} from './container/VisibleNetwork'
import {VisiblePropsEditor} from './container/VisiblePropsEditor'
import {VisibleMenu} from './container/VisibleMenu'
import {VisibleArgsParser} from './container/VisibleArgsParser'
import SplitPane from 'react-split-pane'
import {Button,Dimmer,Loader,Segment} from 'semantic-ui-react'
import {ipcRenderer} from 'electron'

class App extends React.Component {
  constructor(prop) {
    super(prop)
    this.logRef = React.createRef()
    this.state = {
      message: [],
      logEnabled: false,
      state: null
    }
    ipcRenderer.on('build-run-log', (event, arg) => {
      const {stderr} = arg
      console.log(arg)
      this.setState({
        message: this.state.message.concat(arg),
      }, ()=>{
        const bottom = this.logRef.current.scrollHeight-this.logRef.current.clientHeight
        this.logRef.current.scroll(0, bottom)
      })
      //this.setState({message: this.state.message.concat(message)})
    })
    ipcRenderer.on('begin-run-project', (event, arg) => {
      this.setState({
        state: (
          <Segment vertical padded='very'>
            <Loader indeterminate>Build & Run the Simulation</Loader>
          </Segment>
        ),
        logEnabled: true
      })
    })
    ipcRenderer.on('end-run-project', (event, state) => {
      console.log('exit state',state)
      this.setState({
        state: (
          <Segment vertical>
            <Button basic inverted
              onClick={()=>this.setState({logEnabled: false,message:[]})}>
              Close
            </Button>
          </Segment>
        ),
      })
    })
  }
  render() {
    return (
      <div>
        <Dimmer active={this.state.logEnabled}>
          {this.state.state}
          <Segment vertical inverted>
            <div style={{
              textAlign: 'left',
              maxHeight: '400px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
            ref={this.logRef}>
              {this.state.message.map(({stdout,stderr},idx)=>{
                if (stdout) return (<div key={idx}>{stdout}</div>)
                if (stderr) return (<div style={{color: 'red'}} key={idx}>{stderr}</div>)
              })}
            </div>
          </Segment>
        </Dimmer>

        <SplitPane split="vertical">
          <div>
            <VisibleArgsParser />
            <VisibleMenu />
          </div>
          <div className="wrapper">
            <VisibleToolBox />
            <VisibleNetwork />
            <VisiblePropsEditor />
          </div>
        </SplitPane>
      </div>
    )
  }
}

//
// render
//

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
)
