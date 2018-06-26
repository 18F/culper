import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export default class Email extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      pattern: props.pattern,
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
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: this.state.value
        })
      }
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `email.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    return this.props.onError(value, arr)
  }

  render () {
    return (
      <Generic name={this.props.name}
               label={this.props.label}
               ariaLabel={this.props.ariaLabel}
               placeholder={this.props.placeholder}
               className={`email ${this.props.className || ''}`.trim()}
               type="text"
               disabled={this.props.disabled}
               maxlength={this.props.maxlength}
               pattern={this.state.pattern}
               readonly={this.props.readonly}
               required={this.props.required}
               autocapitalize={this.props.autocapitalize}
               autocorrect={this.props.autocorrect}
               autocomplete={this.props.autocomplete}
               spellcheck={this.props.spellcheck}
               value={this.state.value}
               onChange={this.handleChange}
               onFocus={this.props.Focus}
               onBlur={this.props.Blur}
               onError={this.handleError}
               />
    )
  }
}

Email.defaultProps = {
  pattern: /^([A-z0-9_.-]+)@([A-z0-9.-]+)\.+([A-z.]{2,63})$/,
  value: '',
  spellcheck: false,
  autocapitalize: false,
  autocorrect: false,
  autocomplete: true,
  onError: (value, arr) => { return arr }
}

Email.errors = []
