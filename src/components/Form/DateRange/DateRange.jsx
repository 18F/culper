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
      fromMonth: this.props.fromMonth,
      fromYear: this.props.fromYear,
      toYear: this.props.toYear,
      toMonth: this.props.toMonth,
      fromEstimated: this.props.fromEstimated,
      toEstimated: this.props.toEstimated,
      title: this.props.title || 'Date Range'
    }
  }

  handleChange (field, event) {
    // Get a handle to current state values as well as set the value for the current
    // element that triggered a change
    let state = {
      ...this.state,
      [field]: event.target.value
    }

    // Get relevant date values
    const { fromYear, fromMonth, toYear, toMonth } = state
    if (fromMonth && fromYear && toMonth && toYear) {
      let from = new Date(fromYear, fromMonth, 1)
      let to = new Date(toYear, toMonth, 1)
      if (from > to) {
        state.error = 'From date must come before the to date'
      } else {
        state.error = null
      }
    }

    this.setState(state, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          fromMonth: this.state.fromMonth,
          fromYear: this.state.fromYear,
          toMonth: this.state.toMonth,
          toYear: this.state.toYear,
          fromEstimated: this.state.fromEstimated,
          toEstimated: this.state.toEstimated,
          title: this.state.title
        })
      }
    })
  }

  render () {
    const error = this.state.error ? (<div className="usa-input-error">{this.state.error}</div>) : null
    return (
      <div className="daterange usa-grid">
        <h2>{this.state.title}</h2>
        {error}
        <div className="usa-grid">
          <div className="from-label">
            From date
          </div>
          <DateControl name="from"
                       value={this.state.toMonth}
                       estimated={this.state.estimated}
                       onChange={this.handleChange}
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
                       value={this.state.toMonth}
                       estimated={this.state.estimated}
                       onChange={this.handleChange}
                       onValidate={this.handleValidation}
                       />
          <div className="from-present">
            <span className="or"> or </span>
            <Checkbox name="present"
                      label=""
                      value={this.state.toEstimated}
                      onChange={this.handleChange.bind(this, 'toEstimated')}
                      >
              <span>Present</span>
            </Checkbox>
          </div>
        </div>
      </div>
    )
  }
}
