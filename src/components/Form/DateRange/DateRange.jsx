import React from 'react'
import ValidationElement from '../ValidationElement'
import DateControl from '../DateControl'
import Checkbox from '../Checkbox'
import Svg from '../Svg'
import Show from '../Show'
import { now, extractDate, validDate } from '../../Section/History/dateranges'
import DateRangeValidator from '../../../validators/daterange'

export default class DateRange extends ValidationElement {
  constructor(props) {
    super(props)
    const touched = this.isTouched(props.to.year, props.to.month, props.to.day)
      || this.isTouched(props.from.year, props.from.month, props.from.day)
    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      from: { ...props.from, touched },
      to: { ...props.to, touched },
      present: props.present,
      presentClicked: false,
      title: props.title || 'Date Range',
      error: false,
    }

    this.storeErrors = this.storeErrors.bind(this)
    this.update = this.update.bind(this)
    this.updateFrom = this.updateFrom.bind(this)
    this.updateTo = this.updateTo.bind(this)
    this.updatePresent = this.updatePresent.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleErrorFrom = this.handleErrorFrom.bind(this)
    this.handleErrorTo = this.handleErrorTo.bind(this)
    this.handleErrorPresent = this.handleErrorPresent.bind(this)
    this.handleDisable = this.handleDisable.bind(this)
    this.errors = []
  }

  isTouched(year, month, day) {
    return (
      year != ''
      && month != ''
      && day != ''
      && month >= 1
      && day >= 1
      && year >= 1
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      // Check when disable flag is updated
      this.handleDisable(nextProps)
    }
  }

  handleDisable(nextProps) {
    let errors = [...this.errors] || []
    if (nextProps.disabled) {
      errors = errors.map(err => ({
        code: err.code,
        valid: null,
        uid: err.uid,
      }))
    }
    this.props.onError('', errors)
    this.setState()
  }

  update(queue) {
    this.props.onUpdate({
      name: this.props.name,
      from: { ...this.state.from, touched: true },
      to: { ...this.state.to, touched: true },
      present: this.state.present,
      ...queue,
    })
  }

  updateFrom(values) {
    this.setState({ from: values, presentClicked: false }, () => {
      this.update({ from: values })
    })
  }

  updateTo(values) {
    this.setState({ to: values, presentClicked: false }, () => {
      this.update({ to: values })
    })
  }

  updatePresent(values) {
    // Get a handle to current state values as well as set the value for the current
    // element that triggered a change
    const futureState = {
      ...this.state,
      present: !this.state.present,
      presentClicked: true,
    }

    // If present is true then make the "to" date equal to today
    if (!this.state.present && futureState.present) {
      futureState.to = {
        year: `${now.getFullYear()}`,
        month: `${now.getMonth() + 1}`,
        day: `${now.getDate()}`,
        estimated: false,
      }
    } else if (this.state.present && !futureState.present) {
      futureState.to = {
        year: '',
        month: '',
        day: '',
        estimated: false,
      }
    }
    const errors = this.errors.map((err) => {
      if (err.code.indexOf('daterange.to') === -1) {
        return err
      }

      return {
        code: err.code,
        valid: null,
        uid: err.uid,
      }
    })
    this.errors = errors

    this.setState(futureState, () => {
      this.update(futureState)
    })
  }

  storeErrors(arr = [], callback) {
    const errors = [...this.errors]
    for (const e of arr) {
      const idx = errors.findIndex(x => x.uid === e.uid && x.code === e.code)
      if (idx !== -1) {
        errors[idx] = { ...e }
      } else {
        errors.push({ ...e })
      }
    }
    this.errors = [...errors]
    callback()
  }

  handleErrorFrom(value, arr) {
    return this.handleError('from', value, arr)
  }

  handleErrorTo(value, arr) {
    return this.handleError('to', value, arr)
  }

  handleErrorPresent(value, arr) {
    return this.handleError('present', value, arr)
  }

  handleError(code, value, arr) {
    arr = arr.map(err => ({
      code: `${
        this.props.dateRangePrefix ? this.props.dateRangePrefix : 'daterange'
      }.${code}.${err.code.replace('date.', '')}`,
      valid: err.valid,
      uid: err.uid,
    }))

    // Handle required
    arr = arr.concat(
      this.constructor.errors
        .filter(err => err.code === 'required')
        .map((err) => {
          const value = { ...this.state }
          return {
            code: `daterange.${err.code}`,
            valid: err.func(value, this.props),
            uid: this.state.uid,
          }
        })
    )

    // Introducing local state to the DateControl so it can determine
    // if there were **any** errors found in other child components.
    this.storeErrors(arr, () => {
      const existingErr = this.errors.some(e => e.valid === false)
      let local = []
      const noneRequiredErrors = this.constructor.errors.filter(
        err => err.code !== 'required'
      )

      if (!existingErr && this.state.from && this.state.to) {
        // Prepare some properties for the error testing
        const props = {
          from: this.state.from,
          to: this.state.to,
        }

        local = noneRequiredErrors.map(err => ({
          code: err.code,
          valid: err.func(null, props),
          uid: this.state.uid,
        }))
      } else {
        local = noneRequiredErrors.map(err => ({
          code: err.code,
          valid: null,
          uid: this.state.uid,
        }))
      }

      this.setState({ error: local.some(x => x.valid === false) }, () => {
        this.props.onError(value, [...arr].concat(local))
      })
    })

    return arr
  }

  render() {
    const klass = `daterange ${this.props.className || ''}`.trim()
    const klassTo = `to ${this.state.error ? 'usa-input-error' : ''}`.trim()

    return (
      <div className={klass}>
        <div className="from-grid">
          <div className="from-label">From date</div>
          <DateControl
            name="from"
            className="from"
            {...this.state.from}
            onUpdate={this.updateFrom}
            minDate={this.props.minDate}
            minDateEqualTo={this.props.minDateEqualTo}
            maxDate={this.props.maxDate}
            maxDateEqualTo={this.props.maxDateEqualTo}
            prefix={this.props.prefix}
            relationship={this.props.relationship}
            onError={this.handleErrorFrom}
            disabled={this.props.disabled}
            required={this.props.required}
          />
        </div>
        <div className="arrow" />
        <div className="to-grid">
          <div className="from-label">To date</div>
          <DateControl
            name="to"
            ref="to"
            className={klassTo}
            {...this.state.to}
            receiveProps={this.state.presentClicked}
            disabled={this.state.present || this.props.disabled}
            onUpdate={this.updateTo}
            minDate={this.props.minDate}
            minDateEqualTo={this.props.minDateEqualTo}
            maxDate={this.props.maxDate}
            maxDateEqualTo={this.props.maxDateEqualTo}
            prefix={this.props.prefix}
            relationship={this.props.relationship}
            onError={this.handleErrorTo}
            required={
              this.props.required && !this.state.present && !this.props.disabled
            }
          />
        </div>
        <Show when={this.props.allowPresent}>
          <div className="or-present">
            <div className="from-present">
              <span className="or"> or </span>
            </div>
            <div className="from-present">
              <Checkbox
                name="present"
                className="present"
                label="Present"
                value="present"
                disabled={this.props.disabled}
                checked={this.state.present}
                onUpdate={this.updatePresent}
                onError={this.handleErrorPresent}
              />
            </div>
          </div>
        </Show>
      </div>
    )
  }
}

DateRange.defaultProps = {
  from: {
    touched: false,
  },
  to: {
    touched: false,
  },
  present: false,
  prefix: '',
  dateRangePrefix: '',
  minDate: null,
  minDateEqualTo: false,
  maxDate: new Date(),
  maxDateEqualTo: false,
  relationship: '',
  allowPresent: true,
  onError: (value, arr) => arr,
  disabled: false,
}

DateRange.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required && !props.disabled) {
        return validDate(value.from) && validDate(value.to)
      }
      return true
    },
  },
  {
    code: 'daterange.order',
    func: (value, props) => {
      if (!props.from || !props.to) {
        return null
      }
      return new DateRangeValidator(props).isValid()
    },
  },
]
