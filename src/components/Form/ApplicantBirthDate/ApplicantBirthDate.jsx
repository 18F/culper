import React from 'react'
import ValidationElement from '../validationElement'
import DateControl from '../DateControl'

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
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
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
      super.handleValidation(event, status)
    })
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
      <div>
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
