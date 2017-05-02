import React from 'react'
import ValidationElement from '../ValidationElement'
import Number from '../Number'
import Checkbox from '../Checkbox'
import Dropdown from '../Dropdown'
import { daysInMonth, validDate } from '../../Section/History/dateranges'
import DateControlValidator from '../../../validators/datecontrol'

export const trimLeadingZero = (num) => {
  if (isNaN(num)) {
    return num
  }

  const i = parseInt(`0${num}`, 10)
  return i === 0 ? '' : '' + i
}

export const datePart = (part, date) => {
  if (!date) {
    return ''
  }

  let d = new Date(date)

  // Make sure it is a valid date
  if (isNaN(d.getTime())) {
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
      maxDate: props.maxDate,
      month: trimLeadingZero(props.month) || datePart('m', props.value),
      day: trimLeadingZero(props.day) || props.hideDay ? 1 : datePart('d', props.value),
      year: trimLeadingZero(props.year) || datePart('y', props.value),
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
        month = datePart('m', next.value)
        day = datePart('d', next.value)
        year = datePart('y', next.value)
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
    let prefix = `${this.props.prefix ? this.props.prefix + '.' : ''}`

    if (event.target.name.indexOf('month') !== -1) {
      month = status != null ? status : null
    }
    if (event.target.name.indexOf('day') !== -1) {
      day = status != null ? status : null
    }
    if (event.target.name.indexOf('year') !== -1) {
      year = status != null ? status : null
    }

    const isValidDate = validDate(this.state.month, this.state.day, this.state.year)
    const validator = new DateControlValidator(this.state, this.props)

    if (!isValidDate && !error) {
      if (this.state.day > daysInMonth(this.state.month, this.state.year)) {
        error = 'day.max'
      } else {
        error = { day: null }
      }
    }

    // Make sure we have a valid date and that no other errors are present
    // before validating max date
    let handleMinMaxError = false
    if (isValidDate) {
      const minMaxErrorKey = `${prefix}datecontrol`

      // Clear existing min/max errors
      super.handleValidation(event, false, {[minMaxErrorKey]: null})

      // Perform checks for min and max
      if (!validator.validMaxDate()) {
        error = `${minMaxErrorKey}.max`
        handleMinMaxError = true
      }
      if (!validator.validMinDate()) {
        error = `${minMaxErrorKey}.min`
        handleMinMaxError = true
      }
    }

    const codes = super.mergeError(errorCodes, error)
    this.setState(
      {
        error: !isValidDate || (month === false && day === false && year === false),
        valid: isValidDate && month === true && day === true && year === true,
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
          if (!error && (month === null || day === null || year === null)) {
            s = null
          } else {
            s = (!handleMinMaxError) && isValidDate
          }
          super.handleValidation(event, s, error)
        } else {
          super.handleValidation(event, status, error)
        }
      })
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
                      maxlength="2"
                      receiveProps={this.props.receiveProps}
                      value={this.state.month}
                      disabled={this.state.disabled}
                      readonly={this.props.readonly}
                      required={this.props.required}
                      onChange={this.handleChange}
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur}
                      onValidate={this.handleValidation}
                      tabNext={() => { this.refs.day.refs.number.refs.input.focus() }}
                      >
              <option key="jan" value="Janurary">1</option>
              <option key="feb" value="February">2</option>
              <option key="mar" value="March">3</option>
              <option key="apr" value="April">4</option>
              <option key="may" value="May">5</option>
              <option key="jun" value="June">6</option>
              <option key="jul" value="July">7</option>
              <option key="aug" value="August">8</option>
              <option key="sep" value="September">9</option>
              <option key="oct" value="October">10</option>
              <option key="nov" value="November">11</option>
              <option key="dec" value="December">12</option>
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
                    tabBack={() => { this.refs.month.refs.autosuggest.input.focus() }}
                    tabNext={() => { this.refs.year.refs.number.refs.input.focus() }}
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
                    tabBack={() => { this.refs.day.refs.number.refs.input.focus() }}
                    />
          </div>
        </div>
        <div className="flags">
          <Checkbox name="estimated"
                    ref="estimated"
                    label="Estimated"
                    toggle="false"
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
  year: '',
  prefix: '',
  maxDate: new Date(),
  minDate: null
}
