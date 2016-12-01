import React from 'react'
import Text from '../Text'

export default class ApoFpo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
      help: props.help,
      required: props.required,
      value: props.value,
      error: props.error || false,
      valid: props.valid || false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value })
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({
      error: status === false,
      valid: status === true
    })

    if (this.props.onValidation) {
      this.props.onValidation(status)
    }
  }

  render () {
    return (
      <Text name={this.state.name}
            label={this.state.label}
            placeholder={this.state.placeholder}
            help={this.state.help}
            minlength="2"
            maxlength="2"
            required="true"
            value={this.state.value}
            error={this.state.error}
            valid={this.state.valid}
            onChange={this.handleChange}
            onValidation={this.handleValidation}
            />
    )
  }
}
