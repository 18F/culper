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
      // error: props.error,
      // valid: props.valid,
      // errorCode: null
    }
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

  /**
   * Execute validation checks on the value.
   *
   * Possible return values:
   *  1. null: In a neutral state
   *  2. false: Does not meet criterion and is deemed invalid
   *  3. true: Meets all specified criterion
   */
  handleValidation (event, status) {
    if (status === false) {
      super.handleValidation(event, status, null)
      return
    }

    let errorCode = null
    let hits = 0
    status = true

    if (!isNaN(parseInt(this.state.value))) {
      if (status && this.props.min) {
        status = parseInt(this.state.value) >= parseInt(this.props.min)
        if (status === false) {
          errorCode = 'min'
        }
        hits++
      }

      if (status && this.props.max) {
        status = parseInt(this.state.value) <= parseInt(this.state.max)
        if (status === false) {
          errorCode = 'max'
        }
        hits++
      }
    }

    // If nothing was tested then go back to neutral
    if (hits === 0) {
      status = null
    }

    // Set the internal state
    this.setState({error: status === false, valid: status === true, errorCode: errorCode}, () => {
      const errorObject = { [this.props.name]: errorCode }
      const statusObject = { [this.props.name]: { status: status } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `number.${err.code}`,
        valid: err.valid
      }
    })

    // Take the original and concatenate our new error values to
    // it
    arr.concat(this.props.onError(value, this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
  }

  render () {
    // console.log('number value:', this.state.value)
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
               focus={this.props.focus}
               error={this.state.error}
               valid={this.state.valid}
               onChange={this.handleChange}
               onFocus={this.props.onFocus}
               onBlur={this.props.onBlur}
               onValidate={this.handleValidation}
               onKeyDown={this.props.onKeyDown}
               onCopy={this.props.onCopy}
               onCut={this.props.onCut}
               onPaste={this.props.onPaste}
               clipboard={this.props.clipboard}
               tabBack={this.props.tabBack}
               tabNext={this.props.tabNext}
               ref="number"
               onError={this.handleErrors}
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
  focus: false,
  error: false,
  valid: false,
  errorCode: null,
  onError: (value, arr) => { return arr }
}

Number.errors = [
  {
    code: 'min',
    func: (value, props) => {
      return parseInt(value) >= parseInt(props.min)
    }
  }
]
