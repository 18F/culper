import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class ApoFpo extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
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
    const klass = `apofpo ${this.props.className || ''}`.trim()
    return (
      <Text name={this.props.name}
            label={this.props.label}
            className={klass}
            placeholder={this.props.placeholder}
            minlength="2"
            maxlength="2"
            required="true"
            value={this.state.value}
            error={this.state.error}
            valid={this.state.valid}
            onChange={this.handleChange}
            onValidate={this.handleValidation}
            tabBack={this.props.tabBack}
            tabNext={this.props.tabNext}
            />
    )
  }
}
