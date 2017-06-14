import React from 'react'
import { reportCompletion } from '../../actions/ApplicationActions'

export default class SubsectionElement extends React.Component {
  constructor (props) {
    super(props)

    this.handleError = this.handleError.bind(this)
    this.handleCompletion = this.handleCompletion.bind(this)
  }

  handleCompletion () {
    this.props.dispatch(reportCompletion(this.props.section, this.props.subsection, this.props.validator(this.state, this.props)))
  }

  handleError (value, arr) {
    this.handleCompletion()
    return this.props.onError(value, arr)
  }
}

SubsectionElement.defaultProps = {
  section: '',
  subsection: '',
  dispatch: () => {},
  validator: (state, props) => { return false },
  onError: (value, arr) => { return arr }
}
