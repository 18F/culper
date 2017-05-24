import React from 'react'
import ValidationElement from '../ValidationElement'
import TokenInput, { Option } from 'react-tokeninput'

export default class MultipleDropdown extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      input: props.input,
      loading: props.loading,
      options: props.options.concat(this.parseChildren()),
      value: props.value,
      error: props.error,
      valid: props.valid,
      errors: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  parseChildren () {
    return !this.props.children
      ? []
      : this.props.children.filter(child => child.type === 'option').map(child => {
        return {
          name: child.props.children || '',
          value: child.props.value
        }
      })
  }

  /**
   * Execute validation checks on the value.
   */
  handleBlur (event) {
    const value = this.state.value
    console.log('handleBlur', value)
    if (value.length) {
      const errors = this.props.onError(value, this.constructor.errors.map(err => {
        return {
          code: err.code,
          valid: err.func(value, { options: this.state.options })
        }
      })) || []

      this.setState({ error: errors.some(x => !x.valid), valid: errors.every(x => x.valid) })
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (value) {
    this.setState({ value: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate(value)
      }
    })
  }

  /**
   * Handle the remove event.
   */
  handleRemove (value) {
    this.handleChange(this.state.value.filter(x => x !== value))
  }

  /**
   * Handle the select event.
   */
  handleSelect (value, element) {
    if (typeof value === 'string') {
      value = { id: value, name: value }
    }

    // If it is currently not selected then add it to the array
    if (this.state.value.every(x => x.value !== value.value)) {
      this.handleChange(this.state.value.concat([value]))
    }
  }

  /**
   * Handle new input.
   */
  handleInput (userInput) {
    this.setState({ input: userInput })
  }

  filter (value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? []
      : this.state.options.filter(opt => opt.name.toLowerCase().slice(0, inputLength) === inputValue || opt.value.toLowerCase().slice(0, inputLength) === inputValue)
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    return `multiple-dropdown ${this.props.className || ''} ${!this.props.disabled && (this.state.error || this.props.error) ? 'usa-input-error' : ''}`.trim()
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass () {
    if (this.props.disabled) {
      return 'disabled'
    }

    return `${this.state.error || this.props.error ? 'usa-input-error-label' : ''}`.trim()
  }

  render () {
    const options = this.filter(this.state.input).map(opt => {
      return (
        <Option key={opt.value}
                value={opt}
                isFocusable={true}>
          {opt.name}
        </Option>
      )
    })

    // The `Country` component may pass the value as a string. This causes an
    // infinite loop which is less than desirable.
    let value = this.state.value
    if (typeof value === 'string') {
      if (value === '') {
        value = []
      } else {
        value = [{ id: value, name: value }]
      }
    }

    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <TokenInput menuContent={options}
                    onChange={this.handleChange}
                    onInput={this.handleInput}
                    onSelect={this.handleSelect}
                    onRemove={this.handleRemove}
                    onBlur={this.handleBlur}
                    selected={value}
                    placeholder={this.props.placeholder}
                    />
      </div>
    )
  }
}

MultipleDropdown.defaultProps = {
  name: 'multiple-dropdown',
  label: '',
  placeholder: '',
  maxlength: 255,
  disabled: false,
  pattern: '',
  readonly: false,
  className: '',
  focus: false,
  error: false,
  valid: false,
  input: '',
  loading: false,
  options: [],
  value: [],
  onError: (value, arr) => { return arr }
}

MultipleDropdown.errors = []
