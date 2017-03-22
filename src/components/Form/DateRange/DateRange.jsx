import React from 'react'
import ValidationElement from '../ValidationElement'
import DateControl from '../DateControl'
import Checkbox from '../Checkbox'

export default class DateRange extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      from: props.from,
      to: props.to,
      present: props.present,
      presentClicked: false,
      trickleDown: false,
      title: props.title || 'Date Range'
    }
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

  handleChange (event) {
    // Get a handle to current state values as well as set the value for the current
    // element that triggered a change
    let futureState = {
      ...this.state,
      present: !this.state.present,
      presentClicked: true
    }

    // If present is true then make the "to" date equal to today
    if (!this.state.present && futureState.present) {
      let now = new Date()
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
      super.handleChange(event)

      // This will force a blur/validation
      this.refs.to.refs.month.refs.autosuggest.input.focus()
      this.refs.to.refs.month.refs.autosuggest.input.blur()
      this.refs.to.refs.day.refs.input.focus()
      this.refs.to.refs.day.refs.input.blur()
      this.refs.to.refs.year.refs.input.focus()
      this.refs.to.refs.year.refs.input.blur()
      this.handleValidation(event, null, null)

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
    if (event && status !== false && this.state.from && this.state.to) {
      if (this.state.from.date && this.state.to.date) {
        if (this.state.from.date > this.state.to.date) {
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
                       onValidate={this.handleValidation}
                       onFlush={this.props.onFlush}
                       />
        </div>
        <div className="arrow">
          <img src="../img/date-down-arrow.svg" />
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
                       onValidate={this.handleValidation}
                       onFlush={this.props.onFlush}
                       />
          <div className="from-present">
            <span className="or"> or </span>
            <Checkbox name="present"
                      label=""
                      value="present"
                      checked={this.state.present}
                      onChange={this.handleChange}
                      >
              <span>Present</span>
            </Checkbox>
          </div>
        </div>
      </div>
    )
  }
}

DateRange.defaultProps = {
  from: {},
  to: {},
  present: false
}
