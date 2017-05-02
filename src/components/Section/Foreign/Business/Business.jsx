import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement } from '../../../Form'

export default class Business extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      error: false,
      valid: false,
      errorCodes: []
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  isValid () {
    return false
  }

  render () {
    return (
      <div className="foreign-business">
      </div>
    )
  }
}

Business.defaultProps = {
  name: 'Business'
}
