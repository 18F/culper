import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export const trimLeadingZero = (num) => {
  if (isNaN(num) || num === '') {
    return ''
  }

  return '' + parseInt(`0${num}`, 10)
}

export default class Number extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: trimLeadingZero(props.value),
      max: props.max
    }

    this.handleError = this.handleError.bind(this)
  }

  componentWillReceiveProps (next) {
    if (!next.receiveProps) {
      return
    }

    const old = this.state.max
    this.setState({ max: next.max, value: trimLeadingZero(next.value) }, () => {
      if (old !== next.max) {
        this.handleValidation(
          {
            fake: true,
            target: {
              name: this.props.name
            }
          }, null)
      }
    })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()

    // Prevent non-numerical values from being entered
    let value = event.target.value
    if (!value.match(/^(\s*|\d+)$/)) {
      value = value.replace(/\D/g, '')
    }

    this.setState({ value: trimLeadingZero(value) }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: this.state.value
        })
      }
    })
  }

  handleError (value, arr) {
    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
  }

  render () {
    return (
      <Generic name={this.props.name}
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
               value={this.state.value}
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
  pattern: '^(\\s*|\\d+)$',
  errorCode: null,
  onError: (value, arr) => { return arr }
}

Number.errors = [
  {
    code: 'min',
    func: (value, props) => {
      return parseInt(value) >= parseInt(props.min)
    }
  },
  {
    code: 'max',
    func: (value, props) => {
      return parseInt(value) <= parseInt(props.max)
    }
  }
]
