import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class City extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    })
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
    arr = arr.map(err => {
      return {
        code: `city.${err.code}`,
        valid: err.valid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  render () {
    const klass = `city ${this.props.className || ''}`.trim()
    return (
      <Text name={this.props.name}
            label={this.props.label}
            placeholder={this.props.placeholder}
            minlength="2"
            maxlength="100"
            required="true"
            className={klass}
            value={this.state.value}
            error={this.state.error}
            valid={this.state.valid}
            onChange={this.handleChange}
            onError={this.handleError}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            />
    )
  }
}

City.defaultProps = {
  name: 'city',
  value: '',
  error: false,
  valid: false,
  errors: []
}

City.errors = []
