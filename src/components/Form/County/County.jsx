import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class County extends ValidationElement {
  constructor (props) {
    super(props)

    this.handleError = this.handleError.bind(this)
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `county.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render () {
    return (
      <Text name={this.props.name}
            label={this.props.label}
            ariaLabel={this.props.ariaLabel}
            placeholder={this.props.placeholder}
            minlength="2"
            maxlength="100"
            required={this.props.required}
            className={this.props.className}
            value={this.props.value}
            onUpdate={this.props.onUpdate}
            onError={this.handleError}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            />
    )
  }
}

County.defaultProps = {
  name: 'county',
  value: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  required: false
}

County.errors = []
