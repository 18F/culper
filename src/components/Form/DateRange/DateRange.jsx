import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'
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
    })
  }

  render () {
    const error = this.state.error ? (<div className="usa-input-error">{this.state.error}</div>) : null
    return (
      <div className="daterange usa-grid">
        <h2>{this.state.title}</h2>
        {error}
        <div className="usa-grid">
          <div className="usa-width-one-fourth from-label">
            From
          </div>
          <div className="usa-width-one-fourth">
            <Dropdown
              name="fromMonth"
              label="Month"
              value={this.state.fromMonth}
              disabled={this.props.disabled}
              onChange={this.handleChange.bind(this, 'fromMonth')}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}>
              <option value=""></option>
              <option value="1"> Jan(01) </option>
              <option value="2"> Feb(02) </option>
              <option value="3"> Mar(03) </option>
              <option value="4"> Apr(04) </option>
              <option value="5"> May(05) </option>
              <option value="6"> Jun(06) </option>
              <option value="7"> Jul(07) </option>
              <option value="8"> Aug(08) </option>
              <option value="9"> Sep(09) </option>
              <option value="10"> Oct(10) </option>
              <option value="11"> Nov(11) </option>
              <option value="12"> Dec(12) </option>
            </Dropdown>
          </div>
          <div className="usa-width-one-fourth">
            <Number
              name="fromYear"
              min="1900"
              max="3000"
              label="Year"
              value={this.state.fromYear}
              onChange={this.handleChange.bind(this, 'fromYear')}
            >
            </Number>
          </div>
          <div className="usa-width-one-fourth from-estimated">
            <Checkbox
              name="fromEstimated"
              label="Estimated"
              value={this.state.fromEstimated}
              onChange={this.handleChange.bind(this, 'fromEstimated')}
            >
            </Checkbox>
          </div>
        </div>
        <div className="usa-grid">
          <div className="usa-width-one-fourth from-label">
            To
          </div>
          <div className="usa-width-one-fourth">
            <Dropdown
              name="toMonth"
              label="Month"
              help={this.props.help}
              onChange={this.handleChange.bind(this, 'toMonth')}
              value={this.state.toMonth}
              disabled={this.props.disabled}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}>
              <option value=""></option>
              <option value="1"> Jan(01) </option>
              <option value="2"> Feb(02) </option>
              <option value="3"> Mar(03) </option>
              <option value="4"> Apr(04) </option>
              <option value="5"> May(05) </option>
              <option value="6"> Jun(06) </option>
              <option value="7"> Jul(07) </option>
              <option value="8"> Aug(08) </option>
              <option value="9"> Sep(09) </option>
              <option value="10"> Oct(10) </option>
              <option value="11"> Nov(11) </option>
              <option value="12"> Dec(12) </option>
            </Dropdown>
          </div>
          <div className="usa-width-one-fourth">
            <Number
              name="toYear"
              min="1900"
              max="3000"
              label="Year"
              value={this.state.toYear}
              onChange={this.handleChange.bind(this, 'toYear')}
            >
            </Number>
          </div>
          <div className="usa-width-one-fourth from-estimated">
            <Checkbox
              name="toEstimated"
              label="Estimated"
              value={this.state.toEstimated}
              onChange={this.handleChange.bind(this, 'toEstimated')}
            >
            </Checkbox>
          </div>
        </div>
      </div>
    )
  }
}
