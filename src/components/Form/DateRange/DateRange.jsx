import React from 'react'
import ValidationElement from '../ValidationElement'
import DateControl from '../DateControl'
import Checkbox from '../Checkbox'
import Svg from '../Svg'
import { now } from '../../Section/History/dateranges'

export default class DateRange extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      from: props.from,
      to: props.to,
      present: props.present,
      presentClicked: false,
      title: props.title || 'Date Range',
      error: false,
      errors: []
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
  }

  update (queue) {
    this.props.onUpdate({
      name: this.props.name,
      from: this.state.from,
      to: this.state.to,
      present: this.state.present,
      ...queue
    })
  }

  updateFrom (values) {
    this.setState({ from: values, presentClicked: false }, () => {
      this.update({ from: values })
    })
  }

  updateTo (values) {
    this.setState({ to: values, presentClicked: false }, () => {
      this.update({ to: values })
    })
  }

  updatePresent (values) {
    // Get a handle to current state values as well as set the value for the current
    // element that triggered a change
    let futureState = {
      ...this.state,
      present: !this.state.present,
      presentClicked: true
    }

    // If present is true then make the "to" date equal to today
    if (!this.state.present && futureState.present) {
      futureState.to = {
        date: now,
        year: now.getFullYear(),
        month: `${now.getMonth() - 1}`,
        day: now.getDate(),
        estimated: false
      }
    } else if (this.state.present && !futureState.present) {
      futureState.to = {
        date: '',
        year: '',
        month: '',
        day: '',
        estimated: false
      }
    }
    const errors = futureState.errors.map(err => {
      if (err.code.indexOf('daterange.to') === -1) {
        return err
      }
      return {
        code: err.code,
        valid: null,
        uid: err.uid
      }
    })
    futureState.errors = errors

    this.setState(futureState, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          from: this.state.from,
          to: this.state.to,
          present: this.state.present,
          title: this.state.title
        })
      }
    })
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

  handleErrorFrom (value, arr) {
    return this.handleError('from', value, arr)
  }

  handleErrorTo (value, arr) {
    return this.handleError('to', value, arr)
  }

  handleErrorPresent (value, arr) {
    return this.handleError('present', value, arr)
  }

  handleError (code, value, arr) {
    arr = arr.map(err => {
      return {
        code: `daterange.${code}.${err.code.replace('date.', '')}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Handle required
    arr = arr.concat(this.constructor.errors
      .filter(err => err.code === 'required')
      .map(err => {
        const value = { ...this.state }
        return {
          code: `daterange.${err.code}`,
          valid: err.func(value, this.props),
          uid: this.state.uid
        }
      }))

    // Introducing local state to the DateControl so it can determine
    // if there were **any** errors found in other child components.
    this.storeErrors(arr, () => {
      const existingErr = this.state.errors.some(e => e.valid === false)
      let local = []
      const noneRequiredErrors = this.constructor.errors.filter(err => err.code !== 'required')

      if (!existingErr && this.state.from.date && this.state.to.date) {
        // Prepare some properties for the error testing
        const props = {
          from: this.state.from,
          to: this.state.to
        }

        local = noneRequiredErrors.map(err => {
          return {
            code: err.code,
            valid: err.func(null, props),
            uid: this.state.uid
          }
        })
      } else {
        local = noneRequiredErrors.map(err => {
          return {
            code: err.code,
            valid: null,
            uid: this.state.uid
          }
        })
      }

      this.setState({ error: local.some(x => x.valid === false) }, () => {
        this.props.onError(value, [...arr].concat(local))
      })
    })

    return arr
  }

  render () {
    const klass = `daterange usa-grid ${this.props.className || ''}`.trim()
    const klassTo = `to ${this.state.error ? 'usa-input-error' : ''}`.trim()

    return (
      <div className={klass}>
        <div className="usa-grid from-grid">
          <div className="from-label">
            From date
          </div>
          <DateControl name="from"
                       className="from"
                       {...this.state.from}
                       estimated={this.state.estimated}
                       onUpdate={this.updateFrom}
                       minDate={this.props.minDate}
                       maxDate={this.props.maxDate}
                       prefix={this.props.prefix}
                       onError={this.handleErrorFrom}
                       required={this.props.required}
                       />
        </div>
        <div className="arrow">
          <Svg src="/img/date-down-arrow.svg" alt="Range spanning from one date to another" />
        </div>
        <div className="usa-grid to-grid">
          <div className="from-label">
            To date
          </div>
          <DateControl name="to"
                       ref="to"
                       className={klassTo}
                       {...this.state.to}
                       estimated={this.state.estimated}
                       receiveProps={this.state.presentClicked}
                       disabled={this.state.present}
                       onUpdate={this.updateTo}
                       minDate={this.props.minDate}
                       maxDate={this.props.maxDate}
                       prefix={this.props.prefix}
                       onError={this.handleErrorTo}
                       required={this.props.required}
                       />
          <div className="from-present">
            <span className="or"> or </span>
          </div>
          <div className="from-present">
            <Checkbox name="present"
                      className="present"
                      label="Present"
                      value="present"
                      checked={this.state.present}
                      onUpdate={this.updatePresent}
                      onError={this.handleErrorPresent}
                      />
          </div>
        </div>
      </div>
    )
  }
}

DateRange.defaultProps = {
  from: {},
  to: {},
  present: false,
  prefix: '',
  minDate: null,
  maxDate: new Date(),
  onError: (value, arr) => { return arr }
}

DateRange.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        return !!value.from &&
          !!value.from.day &&
          !!value.from.month &&
          !!value.from.year &&
          !!value.to &&
          !!value.to.day &&
          !!value.to.month &&
          !!value.to.year
      }
      return true
    }
  },
  {
    code: 'daterange.order',
    func: (value, props) => {
      if (!props.from || isNaN(props.from.date) || !props.to || isNaN(props.to.date)) {
        return null
      }
      return props.from.date && props.to.date && props.from.date < props.to.date
    }
  }
]
