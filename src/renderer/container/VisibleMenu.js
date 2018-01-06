'use strict'
import TgimMenu from '../component/menu'
import * as Actions from '../action'

const mapStateToProps = state => {
  return state
}

import {bindActionCreators} from 'redux'
const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch)
}

import {connect} from 'react-redux'
const VisibleMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(TgimMenu)

export {VisibleMenu}
