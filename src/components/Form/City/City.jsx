import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class City extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleError = this.handleError.bind(this)
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `city.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render () {
    const klass = `city ${this.props.className || ''}`.trim()
    return (
      <Text name={this.props.name}
            label={this.props.label}
            placeholder={this.props.placeholder}
            minlength="2"
            maxlength="100"
            required={this.props.required}
            disabled={this.props.disabled}
            className={klass}
            value={this.props.value}
            onUpdate={this.props.onUpdate}
            onError={this.handleError}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            />
    )
  }
}

City.defaultProps = {
  name: 'city',
  value: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  required: false
}

City.errors = []
