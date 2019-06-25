import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export default class Number extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      max: props.max,
    }

    this.handleError = this.handleError.bind(this)
  }

  componentWillReceiveProps(next) {
    if (!next.receiveProps) {
      return
    }

    const old = this.state.max
    this.setState({ max: next.max, value: next.value }, () => {
      if (old !== next.max) {
        this.handleValidation(
          {
            fake: true,
            target: {
              name: this.props.name,
            },
          },
          null
        )
      }
    })
  }

  /**
   * Handle the change event.
   */
  handleChange(event) {
    event.persist()

    // Prevent non-numerical values from being entered
    let { value } = event.target
    if (!value.match(/^(\s*|\d+)$/)) {
      value = value.replace(/\D/g, '')
    }

    super.handleChange(event)
    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        value,
      })
    }
  }

  handleError(value, arr) {
    const errors = arr.concat(
      this.constructor.errors.map(err => (
        {
          code: !this.props.prefix
            ? err.code
            : `${this.props.prefix}.${err.code}`,
          valid: err.func(value, this.props),
          uid: this.state.uid,
        }
      ))
    )

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, errors)
  }

  render() {
    return (
      <Generic
        name={this.props.name}
        label={this.props.label}
        placeholder={this.props.placeholder}
        type="text"
        className={this.props.className}
        disabled={this.props.disabled}
        minlength={this.props.minlength}
        maxlength={this.props.maxlength}
        pattern={this.props.pattern}
        readonly={this.props.readonly}
        required={this.props.required}
        value={this.props.value}
        onChange={this.handleChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onKeyDown={this.props.onKeyDown}
        onCopy={this.props.onCopy}
        onCut={this.props.onCut}
        onPaste={this.props.onPaste}
        clipboard={this.props.clipboard}
        tabBack={this.props.tabBack}
        tabNext={this.props.tabNext}
        ref="number"
        onError={this.handleError}
      />
    )
  }
}

Number.defaultProps = {
  name: 'number',
  disabled: false,
  value: '',
  max: '',
  prefix: '',
  pattern: '^(\\s*|\\d+)$',
  errorCode: null,
  onError: (value, arr) => arr,
}

Number.errors = [
  {
    code: 'min',
    func: (value, props) => {
      if (!value.length) {
        return null
      }

      if (props.min) {
        return parseInt(value) >= parseInt(props.min)
      }

      return true
    }
  },
  {
    code: 'max',
    func: (value, props) => {
      if (!value.length) {
        return null
      }

      if (props.max) {
        return parseInt(value) <= parseInt(props.max)
      }

      return true
    },
  },
]
