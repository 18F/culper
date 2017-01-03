import React from 'react'
import ValidationElement from '../ValidationElement'
import Radio from '../Radio'

export default class Sex extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
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
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.value)
      }
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
    console.log(this.state.value)
    return (
      <div>
        <h2>Sex</h2>
        <Radio
          name="female"
          label="Female"
          placeholder={this.state.placeholder}
          help={this.state.help}
          required="true"
          value="female"
          checked={this.state.value === 'female'}
          error={this.state.error}
          valid={this.state.valid}
          onChange={this.handleChange}
          onValidate={this.handleValidation}
        />
        <Radio
          name="male"
          label="Male"
          placeholder={this.state.placeholder}
          help={this.state.help}
          required="true"
          value="male"
          checked={this.state.value === 'male'}
          error={this.state.error}
          valid={this.state.valid}
          onChange={this.handleChange}
          onValidate={this.handleValidation}
        />
      </div>
    )
  }
}
