import React from 'react'
import ValidationElement from '../ValidationElement'
import { ariaLabel } from '../Generic'

export default class Checkbox extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      checked: props.checked,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }

    this.handleError = this.handleError.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      checked: newProps.checked
    })
  }

  /**
   * Update the value of the checkbox
   */
  update () {
    const checked = !this.state.checked
    const value =  this.props.value
    this.setState({ checked: checked }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: value,
          checked: checked
        })
      }

      this.handleValidation()
    })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.update()
  }

  /**
   * Handle the key press event.
   */
  handleKeyPress (event) {
    const allowedKeys = [' ', 'Enter']
    if (allowedKeys.includes(event.key)) {
      event.preventDefault()
      event.stopPropagation()
      this.update()
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

  handleError (value, arr = []) {
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
   * Execute validation checks on the value.
   */
  handleValidation (event) {
    this.handleError(this.state.checked)
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
    let klass = 'checkbox'

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
    const speech = this.props.ariaLabel ? this.props.ariaLabel : `${this.props.label} for ${ariaLabel(this.refs.checkbox)}`
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
                 onKeyDown={this.handleKeyPress}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 checked={this.state.checked}
                 aria-label={speech}
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
                 onKeyDown={this.handleKeyPress}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 checked={this.state.checked}
                 aria-label={speech}
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
  valid: false,
  onError: (value, arr) => { return arr }
}

Checkbox.errors = []

Checkbox.select = (selectedObj, listObj) => {
  let selected = selectedObj.value
  let list = [...((listObj || {}).values || [])]

  if (list.includes(selected)) {
    list.splice(list.indexOf(selected), 1)
  } else {
    list.push(selected)
  }

  return list
}
