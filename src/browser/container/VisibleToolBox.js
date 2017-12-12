'use strict'
import ToolBox from '../component/toolbox'
import * as Actions from '../action'

const mapStateToProps = state => {
  return state
}

import {bindActionCreators} from 'redux'
const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch)
}

import {connect} from 'react-redux'
const VisibleToolBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBox)

export {VisibleToolBox}
