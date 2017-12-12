'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import {VisibleToolBox} from './container/VisibleToolBox'
import {VisibleNetwork} from './container/VisibleNetwork'

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <VisibleToolBox />
        <VisibleNetwork />
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
