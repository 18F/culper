import React from 'react'
import env from '../../../config/environment'
import { newGuid, newMockGuid, flattenObject, mergeError, triageErrors } from './helpers'

export default class ValidationElement extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  componentDidMount() {
    let event = {
      target: {
        id: this.props.id || '',
        name: this.props.name,
        value: this.props.value,
        checked: this.props.checked
      },
      persist: function() {},
      fake: true
    }

    this.handleValidation(event)
  }

  /**
   * Handle the change event.
   */
  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  /**
   * Handle the focus event.
   */
  handleFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  /**
   * Handle the blur event.
   */
  handleBlur(event) {
    this.handleValidation(event)
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation(event) {
    if (this.props.onValidate) {
      this.props.onValidate(event)
    }
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown(event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event)
    }
  }

  flattenObject(obj) {
    let o = flattenObject(obj)
    return o
  }

  mergeError(previous, error) {
    return mergeError(previous, error)
  }

  triageErrors(section, previous, codes) {
    return triageErrors(section, previous, codes)
  }

  guid() {
    // give a fake GUID so the field IDs don't differ between snapshots
    if (env.IsTest()) {
      return newMockGuid()
    } else {
      return newGuid()
    }
  }
}
