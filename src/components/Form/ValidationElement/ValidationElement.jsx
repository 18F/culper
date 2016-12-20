import React from 'react'

export default class ValidationElement extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.handleValidation(event)
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    if (this.props.onValidate) {
      this.props.onValidate(status)
    }
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown (event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event)
    }
  }
}
