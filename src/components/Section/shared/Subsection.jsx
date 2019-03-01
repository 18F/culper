import React from 'react'
import { reportCompletion } from 'actions/ApplicationActions'
import { newGuid } from '../../Form/ValidationElement'

export default class SubsectionElement extends React.Component {
  constructor(props) {
    super(props)

    this.handleError = this.handleError.bind(this)
    this.handleCompletion = this.handleCompletion.bind(this)
  }

  handleCompletion() {
    const data = {
      ...this.props,
      ...this.state
    }

    this.props.dispatch(
      reportCompletion(
        this.section,
        this.subsection,
        this.props.validator(data)
      )
    )
  }

  handleError(value, arr) {
    this.handleCompletion()
    arr = arr.map(err => {
      return {
        ...err,
        // note the original subsection the field is associated with, as it could be appearing under 'review'
        section: this.section,
        subsection: this.subsection
      }
    })

    return this.props.onError(value, arr)
  }

  guid() {
    return newGuid()
  }

  dataAttributes() {
    return {
      'data-section': this.section,
      'data-subsection': this.subsection
    }
  }
}

SubsectionElement.defaultProps = {
  section: '',
  subsection: '',
  dispatch: () => {},
  validator: data => {
    return false
  },
  onError: (value, arr) => {
    return arr
  }
}
