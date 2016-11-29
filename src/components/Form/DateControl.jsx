import React from 'react'
import { Number } from './Number'

export class DateControl extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
      help: props.help,

      disabled: props.disabled,
      pattern: props.pattern,
      readonly: props.readonly,
      required: props.required,
      value: props.value,

      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,

      month: this.datePart('m', props.value),
      day: this.datePart('d', props.value),
      year: this.datePart('y', props.value),
      focii: [false, false, false]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  /**
   * Retrieve the part of the date requested.
   */
  datePart (part, date) {
    if (date === undefined) {
      return undefined
    }

    let d = new Date(date)

    // Make sure it is a valid date
    if (Object.prototype.toString.call(d) === '[object Date]') {
      if (isNaN(d.getTime())) {
        return undefined
      }
    } else {
      return undefined
    }

    switch (part) {
    case 'month':
    case 'mm':
    case 'm':
      return d.getMonth() + 1

    case 'day':
    case 'dd':
    case 'd':
      return d.getDate()

    case 'year':
    case 'yy':
    case 'y':
      return d.getFullYear()
    }

    return undefined
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let month = this.state.month
    let day = this.state.day
    let year = this.state.year

    if (event.target.id.indexOf('-month') !== -1) {
      month = event.target.value
    }
    if (event.target.id.indexOf('-day') !== -1) {
      day = event.target.value
    }
    if (event.target.id.indexOf('-year') !== -1) {
      year = event.target.value
    }

    this.setState({
      month: month,
      day: day,
      year: year,
      value: new Date(year, month, day)
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    let month = this.state.focii[0]
    let day = this.state.focii[1]
    let year = this.state.focii[2]

    if (event.target.id.indexOf('-month') !== -1) {
      month = true
    }
    if (event.target.id.indexOf('-day') !== -1) {
      day = true
    }
    if (event.target.id.indexOf('-year') !== -1) {
      year = true
    }

    this.setState({
      focus: month || day || year,
      focii: [month, day, year]
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    let month = this.state.focii[0]
    let day = this.state.focii[1]
    let year = this.state.focii[2]

    if (event.target.id.indexOf('-month') !== -1) {
      month = false
    }
    if (event.target.id.indexOf('-day') !== -1) {
      day = false
    }
    if (event.target.id.indexOf('-year') !== -1) {
      year = false
    }

    this.setState({
      focus: month || day || year,
      focii: [month, day, year]
    })
  }

  /**
   * Generated name for the error message.
   */
  errorName (part) {
    return '' + this.state.name + '-' + part + '-error'
  }

  /**
   * Generated name for the part of the date elements.
   */
  partName (part) {
    return '' + this.state.name + '-' + part
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error'
    }

    return klass.trim()
  }

  render () {
    return (
      <div className={this.divClass()}>
        <div className="usa-form-group usa-form-group-month">
          <Number id={this.partName('month')}
                  name={this.partName('month')}
                  placeholder={this.state.placeholder}
                  aria-described-by={this.errorName('month')}
                  disabled={this.state.disabled}
                  max="12"
                  maxlength="2"
                  min="1"
                  readonly={this.state.readonly}
                  required={this.state.required}
                  step="1"
                  value={this.state.month}
                  focus={this.state.focii[0]}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur} />
        </div>
        <div className="usa-form-group usa-form-group-day">
          <Number id={this.partName('day')}
                  name={this.partName('day')}
                  placeholder={this.state.placeholder}
                  aria-described-by={this.errorName('day')}
                  disabled={this.state.disabled}
                  max="1"
                  maxlength="2"
                  min="31"
                  readonly={this.state.readonly}
                  required={this.state.required}
                  step="1"
                  value={this.state.day}
                  focus={this.state.focii[1]}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur} />
        </div>
        <div className="usa-form-group usa-form-group-year">
          <Number id={this.partName('year')}
                  name={this.partName('year')}
                  placeholder={this.state.placeholder}
                  aria-described-by={this.errorName('year')}
                  disabled={this.state.disabled}
                  max={this.state.max}
                  maxlength="4"
                  min="1775"
                  pattern={this.state.pattern}
                  readonly={this.state.readonly}
                  step="1"
                  value={this.state.year}
                  focus={this.state.focii[2]}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur} />
        </div>
      </div>
    )
  }
}
