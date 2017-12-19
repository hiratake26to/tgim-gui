'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import {VisibleToolBox} from './container/VisibleToolBox'
import {VisibleNetwork} from './container/VisibleNetwork'
import {VisiblePropsEditor} from './container/VisiblePropsEditor'
import SplitPane from 'react-split-pane'
import AppMenu from './menu.js'


class App extends React.Component {
  render() {
    return (
      <SplitPane split="vertical">
      <div>
        <AppMenu />
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
