import React from 'react'
import ValidationElement from '../ValidationElement'
import Radio from '../Radio'
import RadioGroup from '../RadioGroup'

export default class MaidenName extends ValidationElement {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleUpdate(values) {
    this.props.onUpdate({
      name: this.props.name,
      value: values.value
    })
  }

  handleError(value, arr) {
    arr = arr.map(err => {
      return {
        code: `maiden.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render() {
    const klass = `maiden-name ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <label>{this.props.label}</label>
        <RadioGroup
          className="option-list option-list-inline"
          selectedValue={this.props.value}
          onError={this.props.onError}
          required={this.props.required}>
          <Radio
            name="maiden-name"
            label="Yes"
            value="Yes"
            className="yes"
            disabled={this.props.disabled}
            readonly={this.props.readonly}
            required={this.props.required}
            onUpdate={this.handleUpdate}
            onError={this.handleError}
          />
          <Radio
            name="maiden-name"
            label="No"
            value="No"
            className="no"
            disabled={this.props.disabled}
            readonly={this.props.readonly}
            required={this.props.required}
            onUpdate={this.handleUpdate}
            onError={this.handleError}
          />
        </RadioGroup>
      </div>
    )
  }
}

MaidenName.defaultProps = {
  value: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

MaidenName.errors = []
