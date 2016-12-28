import React from 'react'
import ValidationElement from '../ValidationElement'
import Radio from '../Radio'

export default class Sex extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: "sex",
      placeholder: props.placeholder,
      help: props.help,
      required: props.required,
      value: props.value,
      error: props.error || false,
      valid: props.valid || false
    }
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

  render () {
    return (
      <div>
        <h2>Sex</h2>
        <Radio
          name={this.state.name}
          label="Female"
          placeholder={this.state.placeholder}
          help={this.state.help}
          required="true"
          value={this.state.value}
          error={this.state.error}
          valid={this.state.valid}
          onChange={this.handleChange}
          onValidate={this.handleValidation}
        />
        <Radio
          name={this.state.name}
          label="Male"
          placeholder={this.state.placeholder}
          help={this.state.help}
          required="true"
          value={this.state.value}
          error={this.state.error}
          valid={this.state.valid}
          onChange={this.handleChange}
          onValidate={this.handleValidation}
        />
      </div>
    )
  }
}
