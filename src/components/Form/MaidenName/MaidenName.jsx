import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'
import Checkbox from '../Checkbox'

export default class MaidenName extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: 'Maiden Name',
      placeholder: props.placeholder,
      help: props.help,
      disabled: props.disabled,
      maxlength: props.maxlength,
      pattern: props.pattern,
      readonly: props.readonly,
      required: props.required,
      value: props.value,
      focus: props.focus || false,
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
      <Checkbox name={this.state.name}
               label={this.state.label}
               placeholder={this.state.placeholder}
               help={this.state.help}
               disabled={this.state.disabled}
               readonly={this.state.readonly}
               required={this.state.required}
               value={this.state.value}
               focus={this.state.focus}
               error={this.state.error}
               valid={this.state.valid}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
               onValidate={this.handleValidation}
               />
    )
  }
}
