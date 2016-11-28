import React from 'react'

export class Text extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
      help: props.help,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }
  }

  /**
   * Generated name for the error message.
   */
  errorName () {
    return '' + this.state.name + '-error'
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error-label'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the span element.
   */
  spanClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error-message'
    } else {
      klass += ' hidden'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass () {
    let klass = ''

    if (this.state.focus) {
      klass += ' usa-input-focus'
    }

    if (this.state.valid) {
      klass += ' usa-input-success'
    }

    return klass.trim()
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()} htmlFor={this.state.name}>{this.state.label}</label>
        <span className={this.spanClass()} id={this.errorName()} role="alert">{this.state.help}</span>
        <input className={this.inputClass()} id={this.state.name} name={this.state.name} type="text" placeholder={this.state.placeholder} aria-described-by={this.errorName()} />
      </div>
    )
  }
}
