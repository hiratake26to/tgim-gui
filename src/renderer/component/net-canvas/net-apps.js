'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

import { Label, Icon, Container, Divider } from 'semantic-ui-react'

class AppLabel extends React.Component {
  state = {
    name: this.props.appName
  }
  render() {
    return (
      <Label as='a' onClick={()=>{this.props.showProps('APP', this.state.name)}}>
        {this.state.name}
        {/* <Icon name='close' /> */}
      </Label>
    )
  }
}

export default class NetApps extends React.Component {
  render() {
    const { apps } = this.props
    const alabels = []

    Object.keys(apps).map( key => {
      alabels.push(
        <AppLabel key={key} appName={key} showProps={this.props.showProps} />
      )
    })

    return (
      <Container>
      <Label.Group color='blue'>
        {alabels}
      </Label.Group>
      </Container>
    )
  }
}
