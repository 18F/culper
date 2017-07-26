import React from 'react'
import ValidationElement from '../ValidationElement'
import Number from '../Number'
import Checkbox from '../Checkbox'
import Dropdown from '../Dropdown'
import Show from '../Show'
import { daysInMonth, validDate } from '../../Section/History/dateranges'
import DateControlValidator from '../../../validators/datecontrol'

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
      uid: `${this.props.name}-${super.guid()}`,
      disabled: props.disabled,
      value: props.value,
      estimated: props.estimated,
      error: props.error,
      valid: props.valid,
      maxDate: props.maxDate,
      month: props.month || datePart('m', props.value),
      day: props.day || props.hideDay ? 1 : datePart('d', props.value),
      year: props.year || datePart('y', props.value),
      errors: []
    }

    this.storeErrors = this.storeErrors.bind(this)
    this.beforeChange = this.beforeChange.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleErrorMonth = this.handleErrorMonth.bind(this)
    this.handleErrorDay = this.handleErrorDay.bind(this)
    this.handleErrorYear = this.handleErrorYear.bind(this)
  }

  componentWillReceiveProps (next) {
    if (next.receiveProps) {
      let value = ''
      let month = ''
      let day = ''
      let year = ''

      if (next.date) {
        value = next.date
        month = '' + (next.date.getMonth() + 1)
        day = next.date.getDate()
        year = next.date.getFullYear()
        this.setState({
          value: value,
          month: month,
          day: day,
          year: year
        })
      } else {
        value = next.value
        month = datePart('m', next.value)
        day = datePart('d', next.value)
        year = datePart('y', next.value)
        this.setState({
          value: value,
          month: month,
          day: day,
          year: year
        })
      }
    }
    if (next.disabled !== this.state.disabled) {
      this.setState({
        disabled: next.disabled
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
    let changed = {
      month: false,
      day: false,
      year: false
    }

    if (name.indexOf('month') !== -1) {
      month = event.target.value
      changed.month = true
    } else if (name.indexOf('day') !== -1) {
      day = event.target.value
      changed.day = true
    } else if (name.indexOf('year') !== -1) {
      year = event.target.value
      changed.year = year.length === 4
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

        // This will force a blur/validation
        if (d && (changed.year || changed.month)) {
          window.setTimeout(() => {
            this.refs.day.refs.number.refs.input.focus()
            this.refs.day.refs.number.refs.input.blur()

            if (changed.month) {
              this.refs.month.refs.autosuggest.input.focus()
            } else if (event.target.focus) {
              event.target.focus()
            }
          }, 200)
        }

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

  handleErrorMonth (value, arr) {
    return this.handleError('month', value, arr)
  }

  handleErrorDay (value, arr) {
    return this.handleError('day', value, arr)
  }

  handleErrorYear (value, arr) {
    return this.handleError('year', value, arr)
  }

  handleError (code, value, arr) {
    arr = arr.map(err => {
      return {
        code: `date.${code}.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Introducing local state to the DateControl so it can determine
    // if there were **any** errors found in other child components.
    this.storeErrors(arr, () => {
      // Get the full date if we can
      const date = validDate(this.state.month, this.state.day, this.state.year)
          ? new Date(this.state.year, this.state.month, this.state.day)
          : null

      const existingErr = this.state.errors.some(e => e.valid === false)

      // If the date is valid and there are no child errors...
      let local = []
      if (date && !existingErr) {
        // Prepare some properties for the error testing
        const props = {
          ...this.props,
          ...this.state,
          validator: new DateControlValidator(this.state, this.props)
        }

        // Call any `onError` binding with error checking specific to the `DateControl`
        local = this.constructor.errors.map(err => {
          return {
            code: `${this.props.prefix ? this.props.prefix : 'date'}.${err.code}`,
            valid: err.func(date, props),
            uid: this.state.uid
          }
        })
      } else {
        local = this.constructor.errors.map(err => {
          return {
            code: `${this.props.prefix ? this.props.prefix : 'date'}.${err.code}`,
            valid: null,
            uid: this.state.uid
          }
        })
      }

      this.setState({ error: local.some(x => x.valid === false) }, () => {
        // Pass any local and child errors to bound functions
        this.props.onError(date, [...arr].concat(local))
      })
    })

    // Return the original array of errors to the child control
    return arr
  }

  storeErrors (arr = [], callback) {
    let errors = [...this.state.errors]
    for (const e of arr) {
      const idx = errors.findIndex(x => x.uid === e.uid && x.code === e.code)
      if (idx !== -1) {
        errors[idx] = { ...e }
      } else {
        errors.push({ ...e })
      }
    }

    this.setState({ errors: errors }, () => {
      callback()
    })
  }

  beforeChange (value) {
    return value.replace(/\D/g, '')
  }

  monthDisplayText (value, text) {
    return `${value} (${text})`.trim()
  }

  render () {
    let klass = `datecontrol ${this.state.error ? 'usa-input-error' : ''} ${this.props.className || ''} ${this.props.hideDay ? 'day-hidden' : ''}`.trim()
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
                      error={this.state.error}
                      disabled={this.state.disabled}
                      readonly={this.props.readonly}
                      required={this.props.required}
                      onChange={this.handleChange}
                      beforeChange={this.beforeChange}
                      onError={this.handleErrorMonth}
                      displayText={this.monthDisplayText}
                      tabNext={() => { this.props.tab(this.refs.day.refs.number.refs.input) }}>
              <option key="jan" value="1">January</option>
              <option key="feb" value="2">February</option>
              <option key="mar" value="3">March</option>
              <option key="apr" value="4">April</option>
              <option key="may" value="5">May</option>
              <option key="jun" value="6">June</option>
              <option key="jul" value="7">July</option>
              <option key="aug" value="8">August</option>
              <option key="sep" value="9">September</option>
              <option key="ja0" value="01">January</option>
              <option key="fe0" value="02">February</option>
              <option key="ma0" value="03">March</option>
              <option key="ap0" value="04">April</option>
              <option key="ma0" value="05">May</option>
              <option key="ju0" value="06">June</option>
              <option key="ju0" value="07">July</option>
              <option key="au0" value="08">August</option>
              <option key="se0" value="09">September</option>
              <option key="oct" value="10">October</option>
              <option key="nov" value="11">November</option>
              <option key="dec" value="12">December</option>
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
                    error={this.state.error}
                    onChange={this.handleChange}
                    onError={this.handleErrorDay}
                    tabBack={() => { this.props.tab(this.refs.month.refs.autosuggest.input) }}
                    tabNext={() => { this.props.tab(this.refs.year.refs.number.refs.input) }}
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
                    max={this.props.maxDate && this.props.maxDate.getFullYear()}
                    maxlength="4"
                    pattern={this.props.pattern}
                    readonly={this.props.readonly}
                    step="1"
                    receiveProps="true"
                    value={this.state.year}
                    error={this.state.error}
                    onChange={this.handleChange}
                    onError={this.handleErrorYear}
                    tabBack={() => { this.props.tab(this.refs.day.refs.number.refs.input) }}
                    required={this.props.required}
                    />
          </div>
        </div>
        <Show when={this.props.showEstimated}>
          <div className="flags">
            <Checkbox name="estimated"
                      ref="estimated"
                      label="Estimated"
                      toggle="false"
                      className="estimated"
                      value={this.state.estimated}
                      checked={this.state.estimated}
                      disabled={this.state.disabled}
                      onChange={this.handleChange}
                      />
          </div>
        </Show>
      </div>
    )
  }
}

DateControl.defaultProps = {
  name: 'datecontrol',
  disabled: false,
  value: '',
  estimated: false,
  showEstimated: true,
  error: false,
  valid: false,
  hideDay: false,
  month: '',
  day: '',
  year: '',
  prefix: '',
  maxDate: new Date(),
  minDate: null,
  onError: (value, arr) => { return arr },
  tab: (el) => { el.focus() }
}

DateControl.errors = [
  {
    code: 'max',
    func: (value, props) => {
      if (!value || isNaN(value)) {
        return null
      }
      return value && props.validator.validMaxDate()
    }
  },
  {
    code: 'min',
    func: (value, props) => {
      if (!value || isNaN(value)) {
        return null
      }
      return value && props.validator.validMinDate()
    }
  }
]
