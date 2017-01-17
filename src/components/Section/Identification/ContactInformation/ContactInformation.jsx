import React from 'react'
import { ValidationElement, Help, Text, Checkbox, Email } from '../../../Form'
import { api } from '../../../../services/api'

export default class ContactInformation extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      label: props.label,
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCodes: []
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown (event) {
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

  }

  render () {
    return (
      <div className="contact">
        <h2>Your Contact Information</h2>
      </div>
    )
  }
}
