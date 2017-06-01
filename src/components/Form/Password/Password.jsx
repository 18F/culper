import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export default class Password extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
    })
  }

  handleError (value, arr) {
    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
  }

  render () {
    return (
      <Generic name={this.props.name}
               label={this.props.label}
               placeholder={this.props.placeholder}
               type="password"
               disabled={this.props.disabled}
               maxlength={this.props.maxlength}
               pattern={this.props.pattern}
               readonly={this.props.readonly}
               required={this.props.required}
               value={this.state.value}
               onChange={this.handleChange}
               onError={this.handleError}
               />
    )
  }
}

Password.defaultProps = {
  value: '',
  onError: (value, arr) => { return arr }
}

Password.errors = []
