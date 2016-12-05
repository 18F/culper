import React from 'react'
import ValidationElement from '../validationElement'
import Number from '../Number'

export default class DateControl extends ValidationElement {
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
      foci: [false, false, false],
      validity: [null, null, null]
    }
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

    this.setState(
      {
        month: month,
        day: day,
        year: year,
        value: new Date(year, month, day)
      },
      () => {
        super.handleChange(event)
      })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    let month = this.state.foci[0]
    let day = this.state.foci[1]
    let year = this.state.foci[2]

    if (event.target.id.indexOf('-month') !== -1) {
      month = true
    }
    if (event.target.id.indexOf('-day') !== -1) {
      day = true
    }
    if (event.target.id.indexOf('-year') !== -1) {
      year = true
    }

    this.setState(
      {
        focus: month || day || year,
        foci: [month, day, year]
      },
      () => {
        super.handleFocus(event)
      })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    let month = this.state.foci[0]
    let day = this.state.foci[1]
    let year = this.state.foci[2]

    if (event.target.id.indexOf('-month') !== -1) {
      month = false
    }
    if (event.target.id.indexOf('-day') !== -1) {
      day = false
    }
    if (event.target.id.indexOf('-year') !== -1) {
      year = false
    }

    this.setState(
      {
        focus: month || day || year,
        foci: [month, day, year]
      },
      () => {
        super.handleBlur(event)
      })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    if (!event || !event.target) {
      super.handleValidation(event, status)
      return
    }

    let month = this.state.validity[0]
    let day = this.state.validity[1]
    let year = this.state.validity[2]

    if (event.target.id.indexOf('-month') !== -1) {
      month = status != null ? status : null
    }
    if (event.target.id.indexOf('-day') !== -1) {
      day = status != null ? status : null
    }
    if (event.target.id.indexOf('-year') !== -1) {
      year = status != null ? status : null
    }

    this.setState(
      {
        error: month === false && day === false && year === false,
        valid: month === true && day === true && year === true,
        validity: [month, day, year]
      },
      () => {
        // To calculate the overall status of the component we need to consider
        // what is valid when comparing all three child components.
        //
        //  1. If all of the children are in a neutral state then so is this component
        //  2. If all of the children are in a valid state then so is this component
        //  3. All other permutations assume an invalid state
        let s = false
        if (month === null && day === null && year === null) {
          s = null
        } else if (month === true && day === true && year === true) {
          s = true
        }

        super.handleValidation(event, s)
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
                  focus={this.state.foci[0]}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onValidate={this.handleValidation}
                  />
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
                  focus={this.state.foci[1]}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onValidate={this.handleValidation}
                  />
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
                  focus={this.state.foci[2]}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onValidate={this.handleValidation}
                  />
        </div>
      </div>
    )
  }
}
