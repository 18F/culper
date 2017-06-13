import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class Street extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
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
        code: `street.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props),
        uid: err.uid
      }
    })))
  }

  render () {
    return (
      <Text name={this.props.name}
            className={this.props.className}
            label={this.props.label}
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.handleChange}
            onError={this.handleError}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            />
    )
  }
}

Street.defaultProps = {
  value: '',
  onError: (value, arr) => { return arr }
}

Street.errors = []
