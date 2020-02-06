// Copyright (c) 2019 hiratake26to. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
'use strict'
import NetworkCanvas from '../component/net-canvas'
import * as Actions from '../action'

const mapStateToProps = state => {
  return state
}

import {bindActionCreators} from 'redux'
const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch)
}

import {connect} from 'react-redux'
const VisibleNetwork = connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkCanvas)

export {VisibleNetwork}
