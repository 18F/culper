import React from 'react'
import ValidationElement from '../ValidationElement'
import Number from '../Number'
import Checkbox from '../Checkbox'
import Dropdown from '../Dropdown'
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
      focus: props.focus,
      error: props.error,
      valid: props.valid,
      maxDate: props.maxDate,
      month: props.month || datePart('m', props.value),
      day: props.day || props.hideDay ? 1 : datePart('d', props.value),
      year: props.year || datePart('y', props.value),
      foci: [false, false, false],
      validity: [null, null, null],
      errorCodes: []
    }

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
        if (d) {
          this.refs.month.refs.autosuggest.input.focus()
          this.refs.month.refs.autosuggest.input.blur()
          this.refs.day.refs.number.refs.input.focus()
          this.refs.day.refs.number.refs.input.blur()
          this.refs.year.refs.number.refs.input.focus()
          this.refs.year.refs.number.refs.input.blur()
          if (changed.month) {
            this.refs.month.refs.autosuggest.input.focus()
          } else {
            event.target.focus()
          }
        } else if (changed.year || changed.month) {
          this.refs.day.refs.number.refs.input.focus()
          this.refs.day.refs.number.refs.input.blur()
          if (changed.month) {
            this.refs.month.refs.autosuggest.input.focus()
          } else {
            event.target.focus()
          }
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

    // Get the full date if we can
    const date = validDate(this.state.month, this.state.day, this.state.year)
        ? new Date(this.state.year, this.state.month, this.state.day)
        : null

    const existingErr = arr.some(e => e.valid === false)

    // If it is not a valid date...
    if (!date || existingErr) {
      return this.props.onError(date, arr)
    }

    // Prepare some properties for the error testing
    const props = {
      ...this.props,
      ...this.state,
      validator: new DateControlValidator(this.state, this.props)
    }

    // Take the original and concatenate our new error values to it
    return this.props.onError(date, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(date, props),
        uid: this.state.uid
      }
    })))
  }

  beforeChange (value) {
    return value.replace(/\D/g, '')
  }

  monthDisplayText (value, text) {
    return `${value} (${text})`.trim()
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
                      beforeChange={this.beforeChange}
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur}
                      onError={this.handleErrorMonth}
                      displayText={this.monthDisplayText}
                      tabNext={() => { this.refs.day.refs.number.refs.input.focus() }}>
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
                    focus={this.state.foci[1]}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onError={this.handleErrorDay}
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
                    max={this.props.maxDate && this.props.maxDate.getFullYear()}
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
                    onError={this.handleErrorYear}
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
  name: 'datecontrol',
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
  minDate: null,
  onError: (value, arr) => { return arr }
}

DateControl.errors = [
  {
    code: 'day.max',
    func: (value, props) => {
      if (!value || isNaN(value)) {
        return null
      }
      if (value) {
        return parseInt(props.day) <= daysInMonth(value.getMonth() + 1, value.getFullYear())
      }
      return parseInt(props.day) <= daysInMonth(parseInt(props.month), parseInt(props.year))
    }
  },
  {
    code: 'date.max',
    func: (value, props) => {
      if (!value || isNaN(value)) {
        return null
      }
      return value && props.validator.validMaxDate()
    }
  },
  {
    code: 'date.min',
    func: (value, props) => {
      if (!value || isNaN(value)) {
        return null
      }
      return value && props.validator.validMinDate()
    }
  }
]
