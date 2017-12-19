import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Radio extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      checked: props.checked,
      value: props.value,
      focus: props.focus,
      error: props.error,
      valid: props.valid,
      native: props.native
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (!this.refs.radio) {
      // The component has not mounted yet
      return
    }

    this.setState({ checked: newProps.checked })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    const futureChecked = !this.state.checked
    const futureValue = futureChecked ? this.props.value : ''

    this.setState({ checked: futureChecked, value: futureValue }, () => {
      this.props.onUpdate({
        name: this.props.name,
        value: futureValue,
        checked: futureChecked
      })


      // Toggling the focus of the element serves two purposes
      //  1. On a value change it removes the race condition caused
      //     when passing the updates via `onUpdate` and passing values
      //     via `onError` overwriting each other.
      //  2. When the radio button is `clicked` then the validation/errors
      //     is triggered in the proper order.
      if (this.refs.radio) {
        this.refs.radio.blur()
        this.refs.radio.focus()
      }
    })
  }

  handleClick (event) {
    this.handleChange(event)
  }

  handleKeyPress (event) {
    const allowedKeys = [' ', 'Enter']
    if (allowedKeys.includes(event.key)) {
      event.preventDefault()
      event.stopPropagation()
      this.handleChange(event)
    }
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
   * Execute validation checks on the value.
   */
  handleValidation (event) {
    const value = this.state.value
    const errors = this.props.onError(value, this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: value ? err.func(value, this.props) : null,
        uid: this.state.uid
      }
    })) || []

    this.setState({ error: errors.some(x => !x.valid), valid: errors.every(x => x.valid) })
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    let klass = `${this.props.className || ''}`

    if (!this.props.native) {
      klass += ' block'
    }

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

    if (this.state.focus) {
      klass += ' usa-input-focus'
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

    if (this.state.checked) {
      klass += ' selected'
    }

    return klass.trim()
  }

  render () {
    if (this.props.native) {
      return (
        <div className={this.divClass()}>
          <input className={this.inputClass()}
                 id={this.state.uid}
                 name={this.props.name}
                 type="radio"
                 disabled={this.props.disabled}
                 readOnly={this.props.readonly}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 checked={this.state.checked}
                 />
          <label htmlFor={this.state.uid}>
            {this.props.label}
            {this.props.children}
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
                 name={this.state.uid}
                 type="radio"
                 ref="radio"
                 disabled={this.props.disabled}
                 readOnly={this.props.readonly}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onClick={this.handleClick}
                 onKeyDown={this.handleKeyPress}
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

Radio.defaultProps = {
  name: 'radio_input',
  checked: false,
  disabled: false,
  valued: '',
  focus: false,
  error: false,
  valid: false,
  native: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}

Radio.errors = []
