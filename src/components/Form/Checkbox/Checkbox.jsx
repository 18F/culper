import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Checkbox extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
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
   * Style classes applied to the wrapper.
   */
  divClass () {
    let klass = this.props.className || ''
    klass += ' eapp-blocks-checkbox'

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
   * Style classes applied to the input element.
   */
  inputClass () {
    let klass = ''

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
                 id={this.props.name}
                 name={this.props.name}
                 type="checkbox"
                 disabled={this.props.disabled}
                 readOnly={this.props.readonly}
                 value={this.props.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 checked={this.state.checked}
                 />
          <label className={this.labelClass()}
                 htmlFor={this.props.name}>
            {this.props.children}
            <span>{this.props.label}</span>
          </label>
        </div>
      )
    }

    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.props.name}>
          <input className={this.inputClass()}
                 id={this.props.name}
                 name={this.props.name}
                 type="checkbox"
                 disabled={this.props.disabled}
                 readOnly={this.props.readonly}
                 value={this.props.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 checked={this.state.checked}
                 />
          {this.props.children}
          <span>{this.props.label}</span>
        </label>
      </div>
    )
  }
}
