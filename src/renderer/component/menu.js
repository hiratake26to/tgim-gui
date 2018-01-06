'use strict'
import React from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'
import { remote } from 'electron'
import * as fs from 'fs'

// TODO: Update <Search> usage after its will be implemented

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
              <Dropdown.Item>Share</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    )
  }
}

export default AppMenu
