import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Number from '../Number'

export default class Weight extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          value: parseInt(this.state.value)
        })
      }
    })
  }

  handleError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `weight.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  /**
   * Generated name for the error message.
   */
  errorName(part) {
    return '' + this.props.name + '-' + part + '-error'
  }

  /**
   * Generated name for the part of the address elements.
   */
  partName(part) {
    return '' + this.props.name + '-' + part
  }

  render() {
    return (
      <div className="weight">
        <div className="pounds">
          <Number
            id={this.partName('pounds')}
            name="pounds"
            label={i18n.t('identification.traits.label.pounds')}
            aria-describedby={this.errorName('weight')}
            disabled={this.props.disabled}
            max="999"
            maxlength="3"
            min="10"
            readonly={this.props.readonly}
            required={this.props.required}
            step="1"
            value={this.state.value}
            onChange={this.handleChange}
            onError={this.handleError}
          />
        </div>
      </div>
    )
  }
}

Weight.defaultProps = {
  name: 'weight',
  value: '',
  onError: (value, arr) => {
    return arr
  },
  required: false
}

Weight.errors = []
