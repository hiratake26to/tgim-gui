'use strict'
import PropsEditor from '../component/props-editor'
import * as Actions from '../action'

const mapStateToProps = state => {
  return state
}

import {bindActionCreators} from 'redux'
const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch)
}

import {connect} from 'react-redux'
const VisiblePropsEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropsEditor)

export {VisiblePropsEditor}

