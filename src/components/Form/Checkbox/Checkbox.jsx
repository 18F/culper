import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Checkbox extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      label: props.label,
      value: props.value,
      help: props.help,
      disabled: props.disabled,
      readonly: props.readonly,
      required: props.required,
      checked: props.checked,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      checked: newProps.checked
    })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    this.setState({ checked: event.target.checked }, () => {
      super.handleChange(event)
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    event.persist()
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    event.persist()
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
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
    let klass = 'eapp-blocks-checkbox'

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

    if (this.state.checked) {
      klass += ' checked'
    }

    if (this.props.toggle === 'false') {
      klass += ' no-toggle'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the span element.
   */
  errorClass () {
    let klass = 'eapp-error-message'

    if (this.state.error) {
      klass += ' message'
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
    if (this.props.toggle === 'false') {
      return (
        <div className={this.divClass()}>
          <input className={this.inputClass()}
                 id={this.state.name}
                 name={this.state.name}
                 type="checkbox"
                 aria-describedby={this.errorName()}
                 disabled={this.state.disabled}
                 readOnly={this.state.readonly}
                 required={this.state.required}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 checked={this.state.checked}
                 />
          <label className={this.labelClass()}
                 htmlFor={this.state.name}>
            {this.props.children}
            <span>{this.state.label}</span>
          </label>
          <div className={this.errorClass()}>
            <i className="fa fa-exclamation"></i>
            {this.state.help}
          </div>
        </div>
      )
    }

    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.state.name}>
          <input className={this.inputClass()}
                 id={this.state.name}
                 name={this.state.name}
                 type="checkbox"
                 aria-describedby={this.errorName()}
                 disabled={this.state.disabled}
                 readOnly={this.state.readonly}
                 required={this.state.required}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 checked={this.state.checked}
                 />
          {this.props.children}
          <span>{this.state.label}</span>
        </label>
        <div className={this.errorClass()}>
          <i className="fa fa-exclamation"></i>
          {this.state.help}
        </div>
      </div>
    )
  }
}
