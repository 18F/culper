import React from 'react'
import ValidationElement from '../ValidationElement'
import DateControl from '../DateControl'
import Checkbox from '../Checkbox'

export default class DateRange extends ValidationElement {

  constructor (props) {
    super(props)
    this.state = {
      from: this.props.from,
      from_day: '',
      from_month: '',
      from_year: '',
      to: this.props.to,
      to_day: '',
      to_month: '',
      to_year: '',
      present: this.props.present,
      presentClicked: false,
      title: this.props.title || 'Date Range'
    }
  }

  handleChange (field, event) {
    // Get a handle to current state values as well as set the value for the current
    // element that triggered a change
    let futureState = null
    if (field === 'present') {
      futureState = {
        ...this.state,
        present: event.target.checked,
        presentClicked: true
      }
    } else {
      futureState = {
        ...this.state,
        presentClicked: false,
        [field + '_' + event.target.name]: event.target.value
      }
    }

    if (field === 'present') {
      // If present is true then make the "to" date equal to today
      if (!this.state.present && futureState.present) {
        let now = new Date()
        futureState.to = now
        futureState.to_year = now.getFullYear()
        futureState.to_month = now.getMonth() - 1
        futureState.to_day = now.getDate()
      } else if (this.state.present && !futureState.present) {
        futureState.to = null
        futureState.to_year = null
        futureState.to_month = null
        futureState.to_day = null
      }
    }

    if (field === 'from') {
      if (futureState.from_year && futureState.from_month && futureState.from_day && ('' + futureState.from_year).length === 4) {
        futureState.from = new Date(futureState.from_year, futureState.from_month, futureState.from_day)
      }
    }

    if (field === 'to') {
      if (futureState.to_year && futureState.to_month && futureState.to_day && ('' + futureState.to_year).length === 4) {
        futureState.to = new Date(futureState.to_year, futureState.to_month, futureState.to_day)
      }
    }

    this.setState(futureState, () => {
      super.handleChange(event)

      // This will force a blur/validation
      if (field === 'present') {
        this.refs.to.refs.month.refs.input.focus()
        this.refs.to.refs.month.refs.input.blur()
        this.refs.to.refs.day.refs.input.focus()
        this.refs.to.refs.day.refs.input.blur()
        this.refs.to.refs.year.refs.input.focus()
        this.refs.to.refs.year.refs.input.blur()
        this.handleValidation(event, null, null)
      }

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

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    if (status !== false) {
      if (this.state.from && this.state.to) {
        if (this.state.from > this.state.to) {
          status = false
          error = { daterange: 'order' }
        } else {
          error = { daterange: '' }
        }
      }
    }

    super.handleValidation(event, status, error)
  }

  render () {
    const klass = `daterange usa-grid ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <div className="usa-grid">
          <div className="from-label">
            From date
          </div>
          <DateControl name="from"
                       value={this.state.from}
                       estimated={this.state.estimated}
                       onChange={this.handleChange.bind(this, 'from')}
                       onValidate={this.handleValidation}
                       />
        </div>
        <div className="arrow">
          <img src="../img/date-down-arrow.svg" />
        </div>
        <div className="usa-grid">
          <div className="from-label">
            To date
          </div>
          <DateControl name="to"
                       ref="to"
                       value={this.state.to}
                       estimated={this.state.estimated}
                       receiveProps={this.state.presentClicked}
                       disabled={this.state.present}
                       onChange={this.handleChange.bind(this, 'to')}
                       onValidate={this.handleValidation}
                       />
          <div className="from-present">
            <span className="or"> or </span>
            <Checkbox name="present"
                      label=""
                      value="present"
                      checked={this.state.present}
                      onChange={this.handleChange.bind(this, 'present')}
                      >
              <span>Present</span>
            </Checkbox>
          </div>
        </div>
      </div>
    )
  }
}
