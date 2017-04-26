import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class Street extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      error: props.error || false,
      valid: props.valid || false
    }
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

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
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
    return (
      <Text name={this.props.name}
            className={this.props.className}
            label={this.props.label}
            placeholder={this.props.placeholder}
            value={this.state.value}
            error={this.state.error}
            valid={this.state.valid}
            onChange={this.handleChange}
            onValidate={this.handleValidation}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            />
    )
  }
}
