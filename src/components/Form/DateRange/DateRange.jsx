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
      trickleDown: false,
      title: props.title || 'Date Range',
      errors: []
    }

    this.storeErrors = this.storeErrors.bind(this)
    this.updatePresent = this.updatePresent.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleErrorFrom = this.handleErrorFrom.bind(this)
    this.handleErrorTo = this.handleErrorTo.bind(this)
    this.handleErrorPresent = this.handleErrorPresent.bind(this)
  }

  componentWillReceiveProps (next) {
    if (next.receiveProps) {
      this.setState({ from: next.from, to: next.to, trickleDown: true }, () => {
        this.setState({ trickleDown: false })
      })
    }
  }

  onUpdate (field, value) {
    let futureState = {
      ...this.state,
      presentClicked: false,
      [field]: value
    }

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
      futureState.to = {}
      futureState.to.date = now
      futureState.to.year = now.getFullYear()
      futureState.to.month = '' + (now.getMonth() - 1)
      futureState.to.day = now.getDate()
    } else if (this.state.present && !futureState.present) {
      futureState.to = {
        date: '',
        year: '',
        month: '',
        day: ''
      }
    }

    this.setState(futureState, () => {
      // This will force a blur/validation
      this.refs.to.refs.month.refs.autosuggest.input.focus()
      this.refs.to.refs.month.refs.autosuggest.input.blur()
      this.refs.to.refs.day.refs.number.refs.input.focus()
      this.refs.to.refs.day.refs.number.refs.input.blur()
      this.refs.to.refs.year.refs.number.refs.input.focus()
      this.refs.to.refs.year.refs.number.refs.input.blur()

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

    // Introducing local state to the DateControl so it can determine
    // if there were **any** errors found in other child components.
    this.storeErrors(arr, () => {
      const existingErr = this.state.errors.some(e => e.valid === false)
      let local = [...arr]

      if (!existingErr && this.state.from.date && this.state.to.date) {
        // Prepare some properties for the error testing
        const props = {
          from: this.state.from,
          to: this.state.to
        }

        local = local.concat(this.constructor.errors.map(err => {
          return {
            code: err.code,
            valid: err.func(null, props),
            uid: this.state.uid
          }
        }))
      } else {
        local = local.concat(this.constructor.errors.map(err => {
          return {
            code: err.code,
            valid: null,
            uid: this.state.uid
          }
        }))
      }

      this.props.onError(value, local)
    })

    return arr
  }

  render () {
    const klass = `daterange usa-grid ${this.props.className || ''}`.trim()

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
                       onUpdate={this.onUpdate.bind(this, 'from')}
                       receiveProps={this.state.trickleDown}
                       minDate={this.props.minDate}
                       maxDate={this.props.maxDate}
                       prefix={`${this.props.prefix ? this.props.prefix + '.' : ''}from`}
                       onError={this.handleErrorFrom}
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
                       className="to"
                       {...this.state.to}
                       estimated={this.state.estimated}
                       receiveProps={this.state.trickleDown || this.state.presentClicked}
                       disabled={this.state.present}
                       onUpdate={this.onUpdate.bind(this, 'to')}
                       minDate={this.props.minDate}
                       maxDate={this.props.maxDate}
                       prefix={`${this.props.prefix ? this.props.prefix + '.' : ''}to`}
                       onError={this.handleErrorTo}
                       />
          <div className="from-present">
            <span className="or"> or </span>
          </div>
          <div className="from-present">
            <Checkbox name="present"
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
    code: 'daterange.order',
    func: (value, props) => {
      if (!props.from || isNaN(props.from.date) || !props.to || isNaN(props.to.date)) {
        return null
      }
      return props.from.date && props.to.date && props.from.date < props.to.date
    }
  }
]
