import React from 'react'
import { ValidationElement, DateControl } from '../../../Form'
import { api } from '../../../../services/api'

export default class ApplicantBirthDate extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      value: props.value,
      help: props.help,
      estimated: props.estimated
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.date }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          month: this.datePart('m', this.state.value),
          day: this.datePart('d', this.state.value),
          year: this.datePart('y', this.state.value),
          estimated: this.state.estimated
        })
      }
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    if (status !== false) {
      // Calculation to get the age of something compared to now.
      let now = new Date()
      let then = new Date(this.state.value)
      let age = now.getFullYear() - then.getFullYear()
      var m = now.getMonth() - then.getMonth()
      if (m < 0 || (m === 0 && now.getDate() < then.getDate())) {
        age--
      }

      status = age > 16 && age < 131
    }

    let help = this.state.help
    if (status === false) {
      help = 'Applicants must be older than 16 and less than 130 years of age'
    }

    this.setState({error: status === false, valid: status === true, help: help}, () => {
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, status)
        return
      }

      api
        .validateApplicantBirthdate({
          Month: this.datePart('m', this.state.value),
          Day: this.datePart('d', this.state.value),
          Year: this.datePart('y', this.state.value),
          Estimated: this.state.estimated
        })
        .then((response) => {
          // Display and assign the errors as necessary
          if (response.Errors) {
            response.Errors.forEach((e) => {
              this.setState({help: e.Error})
            })
          }
        })
        .then(() => {
          super.handleValidation(event, status)
        })
    })
  }

  /**
   * Retrieve the part of the date requested.
   */
  datePart (part, date) {
    if (date === undefined) {
      return ''
    }

    let d = new Date(date)

    // Make sure it is a valid date
    if (Object.prototype.toString.call(d) === '[object Date]') {
      if (isNaN(d.getTime())) {
        return ''
      }
    } else {
      return ''
    }

    switch (part) {
      case 'month':
      case 'mm':
      case 'm':
        return d.getMonth() + 1

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

  /**
   * Generated name for the error message.
   */
  errorName () {
    return '' + this.state.name + '-error'
  }

  /**
   * Style classes applied to the span element.
   */
  spanClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error-message'
    } else {
      klass += ' hidden'
    }

    return klass.trim()
  }

  render () {
    return (
      <div className="birthdate">
        <h2>Date of birth</h2>
        <span className={this.spanClass()}
              id={this.errorName()}
              role="alert"
              ref="error"
              >
          {this.state.help}
        </span>
        <DateControl name={this.state.name}
                     value={this.state.value}
                     estimated={this.state.estimated}
                     onChange={this.handleChange}
                     onValidate={this.handleValidation}
                     />
      </div>
    )
  }
}
