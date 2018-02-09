import React from 'react'
import { reportCompletion } from '../../actions/ApplicationActions'
import { newGuid } from '../Form/ValidationElement'

export default class SubsectionElement extends React.Component {
  constructor (props) {
    super(props)

    this.handleError = this.handleError.bind(this)
    this.handleCompletion = this.handleCompletion.bind(this)
  }

  handleCompletion () {
    const data = {
      ...this.props,
      ...this.state
    }
    this.props.dispatch(reportCompletion(this.props.section, this.props.subsection, this.props.validator(data, this.context)))
  }

  handleError (value, arr) {
    this.handleCompletion()
    return this.props.onError(value, arr)
  }

  guid () {
    return newGuid()
  }
}

SubsectionElement.defaultProps = {
  section: '',
  subsection: '',
  dispatch: () => {},
  validator: (state, props) => { return false },
  onError: (value, arr) => { return arr }
}
