import React from 'react'
import ValidationElement from '../ValidationElement'
import { ariaLabel } from '../Generic'

export default class Radio extends ValidationElement {
  constructor(props) {
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
    this.skipNext = false
  }

  componentWillReceiveProps(newProps) {
    if (!this.refs.radio) {
      // The component has not mounted yet
      return
    }

    if (this.state.checked !== newProps.checked) {
      this.setState({ checked: newProps.checked })
    }
  }

  /**
   * The concept of skipping an update was brought about by the unnatural way
   * people think a radio button should behave (this was found through a year's
   * worth of usability testing).
   *
   * Expected behavior:
   *   - a click/keypress on the radio button should toggle its checked value
   *   - key presses may be enter, space, and browser default
   *
   * When a mouse click event is fired we make a change to the value of the radio
   * button thus causing another change event. This second event we need to account
   * for and skip further processing.
   */
  skip(clicked) {
    if (this.skipNext) {
      this.skipNext = false
      return true
    }

    this.skipNext = clicked
    return false
  }

  /**
   * Update the value of the radio button
   */
  update(clicked = false) {
    const { name, value, ignoreDeselect } = this.props;
    const { checked } = this.state;

    if (this.skip(clicked)) {
      return
    }
    if (ignoreDeselect && checked) {
      return
    }

    const updatedValue = !checked ? value : ''
    this.setState((prevState) => ({
      checked: !prevState.checked,
      value: updatedValue
    }), () => {
      this.props.onUpdate({
        name,
        value: updatedValue,
        checked
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

  /**
   * Handle the change event.
   */
  handleChange(event) {
    this.update()
  }

  /**
   * Handle the click event.
   */
  handleClick(event) {
    this.update(true)
  }

  /**
   * Handle the key press event.
   */
  handleKeyPress(event) {
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
  handleFocus(event) {
    event.persist()
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur(event) {
    event.persist()
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Execute validation checks on the value.
   */
  handleValidation(event) {
    const value = this.state.value
    const errors =
      this.props.onError(
        value,
        this.constructor.errors.map(err => {
          return {
            code: err.code,
            valid: value ? err.func(value, this.props) : null,
            uid: this.state.uid
          }
        })
      ) || []

    this.setState({
      error: errors.some(x => !x.valid),
      valid: errors.every(x => x.valid)
    })
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass() {
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
  labelClass() {
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
  inputClass() {
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

  render() {
    const speech = this.props.ariaLabel
      ? this.props.ariaLabel
      : `${this.props.label} for ${ariaLabel(this.refs.radio)}`
    if (this.props.native) {
      return (
        <div className={this.divClass()}>
          <input
            className={this.inputClass()}
            id={this.state.uid}
            name={this.state.uid}
            type="radio"
            ref="radio"
            disabled={this.props.disabled}
            readOnly={this.props.readonly}
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            checked={this.state.checked}
            aria-label={speech}
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
        <input
          className={this.inputClass()}
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
          aria-label={speech}
        />
        <label className={this.labelClass()} htmlFor={this.state.uid}>
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
  ariaLabel: '',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

Radio.errors = []
