import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, DateControl, Show, Help, HelpIcon } from '../../../Form'
import { api } from '../../../../services/api'

export default class ApplicantBirthDate extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      estimated: props.estimated,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
  }

  /**
   * Handle the change event.
   */
  onUpdate (value) {
    this.setState({ value: value.date }, () => {
      this.handleValidation({}, null, null)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          month: value.month,
          day: value.day,
          year: value.year,
          estimated: value.estimated
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

    let errorCodes = []
    this.state.errorCodes.forEach((e) => {
      if (e !== 'age' && e !== 'day.max') {
        errorCodes.push(e)
      }
    })

    let fullYear = false
    if (this.state.value !== '') {
      // Calculation to get the age of something compared to now.
      let now = new Date()
      let then = new Date(this.state.value)

      // This is an additional check to delay errors being passed up prematurely
      fullYear = then.getFullYear() > 999
      if (fullYear) {
        let age = now.getFullYear() - then.getFullYear()
        var m = now.getMonth() - then.getMonth()
        if (m < 0 || (m === 0 && now.getDate() < then.getDate())) {
          age--
        }

        if (age < 17 || age > 129) {
          status = false
          error = 'age'
        }
      }
    }

    const codes = super.mergeError(errorCodes, error)
    let complexStatus = null
    if (fullYear) {
      if (codes.length > 0) {
        complexStatus = false
      } else {
        complexStatus = true
      }
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      if (!fullYear) {
        return
      }

      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, statusObject, errorObject)
        return
      }

      super.handleValidation(event, statusObject, errorObject)
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

  render () {
    const klass = `birthdate ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Help id="identification.birthdate.help">
          <DateControl name={this.props.name}
                       value={this.state.value}
                       estimated={this.state.estimated}
                       onUpdate={this.onUpdate}
                       onValidate={this.handleValidation}
                       />
          <HelpIcon />
          <Show when={this.state.errorCodes.includes('age')}>
            <div className="message eapp-error-message">
              <i className="fa fa-exclamation"></i>
              <h5>{i18n.t('error.birthdate.age.title')}</h5>
              {i18n.m('error.birthdate.age.message')}
            </div>
          </Show>
        </Help>
      </div>
    )
  }
}
