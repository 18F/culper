import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'
import DateControl from '../DateControl'
import Checkbox from '../Checkbox'
import Number from '../Number'

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
      title: this.props.title || 'Date Range'
    }
  }

  handleChange (field, event) {
    // Get a handle to current state values as well as set the value for the current
    // element that triggered a change
    let state = null
    if (field === 'present') {
      state = {
        ...this.state,
        present: event.target.checked
      }
    } else {
      state = {
        ...this.state,
        [field + '_' + event.target.name]: event.target.value
      }
    }

    // Get relevant date values
    const { from_year, from_month, from_day, to_year, to_month, to_day } = state
    if (from_year && from_month && from_day && to_year && to_month && to_day) {
      state.from = new Date(from_year, from_month, from_day)
      state.to = new Date(to_year, to_month, to_day)
      if (state.from > state.to) {
        state.error = 'From date must come before the to date'
      } else {
        state.error = null
      }
    }

    this.setState(state, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          from: this.state.from,
          to: this.state.to,
          present: this.state.present,
          title: this.state.title
        })
      }
    })
  }

  /**
   * Style classes applied to the span element.
   */
  errorClass () {
    let klass = 'eapp-error-message'

    if (this.state.error) {
      klass += ' message'
    } else {
      klass += ' hidden'
    }

    return klass.trim()
  }

  render () {
    return (
      <div className="daterange usa-grid">
        <h2>{this.state.title}</h2>
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
        <div className="usa-grid">
        </div>
        <div className="usa-grid">
          <div className="from-label">
            To date
          </div>
          <DateControl name="to"
                       value={this.state.to}
                       estimated={this.state.estimated}
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
        <div className={this.errorClass()}>
          <i className="fa fa-exclamation"></i>
          {this.state.error}
        </div>
      </div>
    )
  }
}
