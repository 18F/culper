import React from 'react'
import ValidationElement from '../ValidationElement'
import Number from '../Number'
import Checkbox from '../Checkbox'

export default class DateControl extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      disabled: props.disabled,
      value: props.value,
      estimated: props.estimated,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      month: props.month || this.datePart('m', props.value),
      day: props.day || this.datePart('d', props.value),
      year: props.year || this.datePart('y', props.value),
      foci: [false, false, false],
      validity: [null, null, null]
    }
  }

  componentWillReceiveProps (next) {
    if (next.receiveProps) {
      this.setState({
        disabled: next.disabled,
        value: next.value,
        month: this.datePart('m', next.value),
        day: this.datePart('d', next.value),
        year: this.datePart('y', next.value)
      })
    }
  }

  /**
   * Retrieve the part of the date requested.
   */
  datePart (part, date) {
    if (!date) {
      return ''
    }

    let d = new Date(date)

    // Make sure it is a valid date
    if (Object.prototype.toString.call(d) === '[object Date]') {
      if (isNaN(d.getTime())) {
        return ''
      }
    } else {
      return ''
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

    return ''
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    let month = this.state.month
    let day = this.state.day
    let year = this.state.year
    let estimated = this.state.estimated

    if (event.target.id.indexOf('month') !== -1) {
      month = event.target.value
    } else if (event.target.id.indexOf('day') !== -1) {
      day = event.target.value
    } else if (event.target.id.indexOf('year') !== -1) {
      year = event.target.value
    } else if (event.target.id.indexOf('estimated') !== -1) {
      estimated = event.target.checked
    }

    let d
    if (year && month && day) {
      d = new Date(year, month - 1, day)
    } else {
      d = ''
    }

    this.setState(
      {
        month: month,
        day: day,
        year: year,
        estimated: estimated,
        value: d
      },
      () => {
        event.target.date = d
        super.handleChange(event)
        if (this.props.onUpdate) {
          this.props.onUpdate({
            name: this.props.name,
            month: this.state.month,
            day: this.state.day,
            year: this.state.year,
            estimated: this.state.estimated,
            date: this.state.value
          })
        }
      })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    let month = this.state.foci[0]
    let day = this.state.foci[1]
    let year = this.state.foci[2]

    if (event.target.id.indexOf('month') !== -1) {
      month = true
    }
    if (event.target.id.indexOf('day') !== -1) {
      day = true
    }
    if (event.target.id.indexOf('year') !== -1) {
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

    if (event.target.id.indexOf('month') !== -1) {
      month = false
    }
    if (event.target.id.indexOf('day') !== -1) {
      day = false
    }
    if (event.target.id.indexOf('year') !== -1) {
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
  handleValidation (event, status, error) {
    if (!event || !event.target) {
      super.handleValidation(event, status, error)
      return
    }

    let month = this.state.validity[0]
    let day = this.state.validity[1]
    let year = this.state.validity[2]

    if (event.target.id.indexOf('month') !== -1) {
      month = status != null ? status : null
    }
    if (event.target.id.indexOf('day') !== -1) {
      day = status != null ? status : null
    }
    if (event.target.id.indexOf('year') !== -1) {
      year = status != null ? status : null
    }

    let valid = this.validDate(this.state.month, this.state.day, this.state.year)

    this.setState(
      {
        error: !valid && month === false && day === false && year === false,
        valid: valid && month === true && day === true && year === true,
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

        super.handleValidation(event, s, error)
      })
  }

  /**
   * Generated name for the error message.
   */
  errorName (part) {
    return '' + this.state.name + '-' + part + '-error'
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

  /**
   * Determine if a specified year is considered a leap year
   */
  leapYear (year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
  }

  /**
   * Determine if a date is valid with leap years considered
   */
  validDate (month, day, year) {
    // Setup for upperbounds of days in months
    let upperBounds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (this.leapYear(year)) {
      upperBounds[1] = 29
    }
    return (month > 0 && month < 13) && (day > 0 && day <= upperBounds[month - 1])
  }

  render () {
    let klass = `datecontrol ${this.props.className || ''} ${this.props.hideDay ? 'day-hidden' : ''}`.trim()

    return (
      <div className={klass}>
        <div className={this.divClass()}>
          <div className="usa-form-group month">
            <Number id="month"
                    name="month"
                    label="Month"
                    placeholder="00"
                    aria-described-by={this.errorName('month')}
                    disabled={this.state.disabled}
                    max="12"
                    maxlength="2"
                    min="1"
                    readonly={this.props.readonly}
                    required={this.props.required}
                    step="1"
                    value={this.state.month}
                    focus={this.state.foci[0]}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onValidate={this.handleValidation}
                    />
          </div>
          <div className={`usa-form-group day ${this.props.hideDay === true ? 'hidden' : ''}`}>
            <Number id="day"
                    name="day"
                    label="Day"
                    placeholder="00"
                    aria-described-by={this.errorName('day')}
                    disabled={this.state.disabled}
                    max="31"
                    maxlength="2"
                    min="1"
                    readonly={this.props.readonly}
                    required={this.props.required}
                    step="1"
                    value={this.state.day}
                    focus={this.state.foci[1]}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onValidate={this.handleValidation}
                    />
          </div>
          <div className="usa-form-group year">
            <Number id="year"
                    name="year"
                    label="Year"
                    placeholder="0000"
                    aria-described-by={this.errorName('year')}
                    disabled={this.state.disabled}
                    max="9999"
                    maxlength="4"
                    min="1775"
                    pattern={this.props.pattern}
                    readonly={this.props.readonly}
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
        <div className="coupled-flags">
          <Checkbox name="estimated"
                    label="Estimated"
                    toggle="false"
                    className={this.props.className}
                    value={this.state.estimated}
                    checked={this.state.estimated}
                    onChange={this.handleChange}
                    />
        </div>
      </div>
    )
  }
}
