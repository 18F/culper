import React from 'react'
import ValidationElement from '../ValidationElement'
import Number from '../Number'
import Checkbox from '../Checkbox'
import Dropdown from '../Dropdown'
import { daysInMonth, validDate } from '../../Section/History/dateranges'

const trimLeadingZero = (num) => {
  if (isNaN(num)) {
    return num
  }

  const i = parseInt(`0${num}`, 10)
  return i === 0 ? '' : '' + i
}

export default class DateControl extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      disabled: props.disabled,
      value: props.value,
      estimated: props.estimated,
      focus: props.focus,
      error: props.error,
      valid: props.valid,
      month: trimLeadingZero(props.month) || this.datePart('m', props.value),
      day: trimLeadingZero(props.day) || props.hideDay ? 1 : this.datePart('d', props.value),
      year: trimLeadingZero(props.year) || this.datePart('y', props.value),
      foci: [false, false, false],
      validity: [null, null, null],
      errorCodes: []
    }
  }

  componentWillReceiveProps (next) {
    if (next.receiveProps) {
      let value = ''
      let month = ''
      let day = ''
      let year = ''

      if (next.value) {
        value = next.value
        month = this.datePart('m', next.value)
        day = this.datePart('d', next.value)
        year = this.datePart('y', next.value)
      } else if (next.date) {
        value = next.date
        month = '' + (next.date.getMonth() + 1)
        day = next.date.getDate()
        year = next.date.getFullYear()
      }

      this.setState({
        disabled: next.disabled,
        value: value,
        month: month,
        day: day,
        year: year
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
        return '' + (d.getMonth() + 1)

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
    const target = event.target || {}
    const name = target.name || target.id || ''

    if (name.indexOf('month') !== -1) {
      month = trimLeadingZero(event.target.value)
    } else if (name.indexOf('day') !== -1) {
      day = trimLeadingZero(event.target.value)
    } else if (name.indexOf('year') !== -1) {
      year = trimLeadingZero(event.target.value)
    } else if (name.indexOf('estimated') !== -1) {
      estimated = event.target.checked
    }

    let d
    if (year && year.length > 3 && month && day) {
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

    if (event.target.name.indexOf('month') !== -1) {
      month = true
    }
    if (event.target.name.indexOf('day') !== -1) {
      day = true
    }
    if (event.target.name.indexOf('year') !== -1) {
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

    if (event.target.name.indexOf('month') !== -1) {
      month = false
    }
    if (event.target.name.indexOf('day') !== -1) {
      day = false
    }
    if (event.target.name.indexOf('year') !== -1) {
      year = false
    }

    this.setState(
      {
        focus: month || day || year,
        foci: [month, day, year]
      },
      () => {
        const focus = month && day && year
        const inputs = this.state.month && this.state.day && this.state.year && this.state.year.length > 3
        if (!focus || inputs) {
          super.handleBlur(event)
        }
      })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event || !event.target || !event.target.name) {
      super.handleValidation(event, status, error)
      return
    }

    let errorCodes = []
    this.state.errorCodes.forEach(e => {
      if (e !== 'day.max') {
        errorCodes.push(e)
      }
    })

    let month = this.state.validity[0]
    let day = this.state.validity[1]
    let year = this.state.validity[2]

    if (event.target.name.indexOf('month') !== -1) {
      month = status != null ? status : null
    }
    if (event.target.name.indexOf('day') !== -1) {
      day = status != null ? status : null
    }
    if (event.target.name.indexOf('year') !== -1) {
      year = status != null ? status : null
    }

    let valid = validDate(this.state.month, this.state.day, this.state.year)
    if (!valid && !error) {
      if (this.state.day > daysInMonth(this.state.month, this.state.year)) {
        error = 'day.max'
      } else {
        error = { day: null }
      }
    }

    const codes = super.mergeError(errorCodes, error)
    this.setState(
      {
        error: !valid || (month === false && day === false && year === false),
        valid: valid && month === true && day === true && year === true,
        validity: [month, day, year],
        errorCodes: codes
      },
      () => {
        const focus = this.state.foci[0] && this.state.foci[1] && this.state.foci[2]
        const inputs = this.state.month && this.state.day && this.state.year && this.state.year.length > 3
        if (!focus && inputs) {
          // To calculate the overall status of the component we need to consider
          // what is valid when comparing all three child components.
          //
          //  1. If all of the children are in a neutral state then so is this component
          //  2. If all of the children are in a valid state then so is this component
          //  3. All other permutations assume an invalid state
          let s = false
          if (month === null || day === null || year === null) {
            s = null
          } else {
            s = valid
          }

          super.handleValidation(event, s, codes)

          if (codes.length === 0 && this.props.onFlush) {
            this.props.onFlush()
          }
        }
      })
  }

  /**
   * Generated name for the error message.
   */
  errorName (part) {
    return '' + this.props.name + '-' + part + '-error'
  }

  render () {
    let klass = `datecontrol ${this.props.className || ''} ${this.props.hideDay ? 'day-hidden' : ''}`.trim()

    return (
      <div className={klass}>
        <div>
          <div className="usa-form-group month">
            <Dropdown name="month"
                      ref="month"
                      label="Month"
                      placeholder="00"
                      receiveProps={this.props.receiveProps}
                      value={this.state.month}
                      disabled={this.state.disabled}
                      readonly={this.props.readonly}
                      required={this.props.required}
                      onChange={this.handleChange}
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur}
                      onValidate={this.handleValidation}
                      >
              <option value="Janurary">1</option>
              <option value="February">2</option>
              <option value="March">3</option>
              <option value="April">4</option>
              <option value="May">5</option>
              <option value="June">6</option>
              <option value="July">7</option>
              <option value="August">8</option>
              <option value="September">9</option>
              <option value="October">10</option>
              <option value="November">11</option>
              <option value="December">12</option>
            </Dropdown>
          </div>
          <div className={`usa-form-group day ${this.props.hideDay === true ? 'hidden' : ''}`}>
            <Number id="day"
                    name="day"
                    ref="day"
                    label="Day"
                    placeholder="00"
                    disabled={this.state.disabled}
                    max={daysInMonth(this.state.month, this.state.year)}
                    maxlength="2"
                    min="1"
                    readonly={this.props.readonly}
                    required={this.props.required}
                    step="1"
                    receiveProps="true"
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
                    ref="year"
                    label="Year"
                    placeholder="0000"
                    disabled={this.state.disabled}
                    min="1000"
                    max="9999"
                    maxlength="4"
                    pattern={this.props.pattern}
                    readonly={this.props.readonly}
                    step="1"
                    receiveProps="true"
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
                    ref="estimated"
                    label="Estimated"
                    toggle="false"
                    className={this.props.className}
                    value={this.state.estimated}
                    checked={this.state.estimated}
                    disabled={this.state.disabled}
                    onChange={this.handleChange}
                    />
        </div>
      </div>
    )
  }
}

DateControl.defaultProps = {
  disabled: false,
  value: '',
  estimated: false,
  focus: false,
  error: false,
  valid: false,
  hideDay: false,
  month: '',
  day: '',
  year: ''
}
