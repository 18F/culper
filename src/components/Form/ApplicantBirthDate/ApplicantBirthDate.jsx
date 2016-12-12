import React from 'react'
import ValidationElement from '../validationElement'
import DateControl from '../DateControl'

export default class ApplicantBirthDate extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
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

    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
  }

  render () {
    return (
      <div>
        <DateControl name={this.props.name}
                     value={this.state.value}
                     estimated={this.state.estimated}
                     onChange={this.handleChange}
                     onValidate={this.handleValidation}
                     />
      </div>
    )
  }
}
