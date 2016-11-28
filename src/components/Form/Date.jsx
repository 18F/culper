import React from 'react'

export class Date extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
      value: props.value,
      help: props.help,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }
  }

  /**
   * Generated name for the error message.
   */
  errorName (part) {
    return '' + this.state.name + '-' + part + '-error'
  }

  /**
   * Generated name for the part of the date elements.
   */
  partName (part) {
    return '' + this.state.name + '-' + part
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
        <div className="usa-form-group usa-form-group-month">
          <label className={this.labelClass()} htmlFor={this.partName('month')}>{this.state.label}</label>
          <span className={this.spanClass()} id={this.errorName('month')} role="alert">{this.state.help}</span>
          <input className={this.inputClass()} id={this.partName('month')} name={this.partName('month')} type="number" placeholder={this.state.placeholder} aria-described-by={this.errorName('month')} value={this.state.value} />
        </div>
        <div className="usa-form-group usa-form-group-day">
          <label className={this.labelClass()} htmlFor={this.partName('day')}>{this.state.label}</label>
          <span className={this.spanClass()} id={this.errorName('day')} role="alert">{this.state.help}</span>
          <input className={this.inputClass()} id={this.partName('day')} name={this.partName('day')} type="number" placeholder={this.state.placeholder} aria-described-by={this.errorName('day')} value={this.state.value} />
        </div>
        <div className="usa-form-group usa-form-group-year">
          <label className={this.labelClass()} htmlFor={this.partName('year')}>{this.state.label}</label>
          <span className={this.spanClass()} id={this.errorName('year')} role="alert">{this.state.help}</span>
          <input className={this.inputClass()} id={this.partName('year')} name={this.partName('year')} type="number" placeholder={this.state.placeholder} aria-described-by={this.errorName('year')} value={this.state.value} />
        </div>
      </div>
    )
  }
}
