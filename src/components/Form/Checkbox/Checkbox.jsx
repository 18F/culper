import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Checkbox extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      uid: super.guid(),
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
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: event.target.value,
          checked: event.target.checked
        })
      }
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
    let klass = `${this.props.className || ''} block`

    if (this.props.children) {
      klass += ' extended'
    }

    if (this.props.disabled) {
      klass += ' disabled'
    }

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
                 id={this.state.uid}
                 name={this.props.name}
                 type="checkbox"
                 ref="checkbox"
                 disabled={this.props.disabled}
                 readOnly={this.props.readonly}
                 value={this.props.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 checked={this.state.checked}
                 />
          <label className={this.labelClass()}
                 htmlFor={this.state.uid}>
            {this.props.children}
            <span>{this.props.label}</span>
          </label>
        </div>
      )
    }

    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.state.uid}>
          <input className={this.inputClass()}
                 id={this.state.uid}
                 name={this.props.name}
                 type="checkbox"
                 ref="checkbox"
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

Checkbox.defaultProps = {
  name: 'checkbox_input',
  checked: false,
  focus: false,
  error: false,
  valid: false
}
