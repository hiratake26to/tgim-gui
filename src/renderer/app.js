'use strict'
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

class App extends React.Component {
  render() {
    return (
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
