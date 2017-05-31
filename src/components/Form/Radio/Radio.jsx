import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Radio extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: super.guid(),
      checked: props.checked,
      value: props.value,
      focus: props.focus,
      error: props.error,
      valid: props.valid,
      native: props.native
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleError = this.handleError.bind(this)
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

    this.setState({checked: event.target.checked}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: this.state.value,
          checked: this.state.checked
        })
      }

      super.handleChange(event)

      // HACK: Race condition was found where the majority of the time the `handleError` would
      // beat the storage routines causing things not to show as valid.
      window.setTimeout(() => { this.handleError(this.state.value) }, 200)
    })
  }

  /**
   * Handle the click event.
   */
  handleClick (event) {
    if (this.props.ignoreDeselect) {
      return
    }

    event.persist()
    const futureChecked = !this.state.checked
    const futureValue = futureChecked ? this.props.value : ''

    this.setState({checked: futureChecked, value: futureValue}, () => {
      this.handleChange(event)
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

  handleError (value, arr = []) {
    const errors = this.props.onError(value, this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })) || []

    this.setState({ error: errors.some(x => !x.valid), valid: errors.every(x => x.valid) })
  }

  /**
   * Execute validation checks on the value.
   */
  handleValidation (event) {
    this.handleError(this.state.value)
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
                 onClick={this.handleClick}
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
                 name={this.props.name}
                 type="radio"
                 ref="radio"
                 disabled={this.props.disabled}
                 readOnly={this.props.readonly}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 onClick={this.handleClick}
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
  onError: (value, arr) => { return arr }
}

Radio.errors = []
