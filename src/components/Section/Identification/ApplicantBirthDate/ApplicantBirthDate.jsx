import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, DateControl } from '../../../Form'
import { now } from '../../History/dateranges'

export default class ApplicantBirthDate extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      error: false
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  onUpdate (value) {
    this.props.onUpdate({
      Date: {
        month: value.month,
        day: value.day,
        year: value.year,
        estimated: value.estimated,
        date: value.date
      }
    })
  }

  handleError (value, arr) {
    const then = new Date(value)
    let local = []
    if (isNaN(then.getFullYear()) || then.getFullYear() < 1000 || arr.some(x => x.valid === false)) {
      local = this.constructor.errors.map(err => {
        return {
          code: err.code,
          valid: null,
          uid: this.state.uid
        }
      })
    } else {
      local = this.constructor.errors.map(err => {
        return {
          code: err.code,
          valid: err.func(then, this.props),
          uid: this.state.uid
        }
      })
    }

    this.setState({ error: local.some(x => x.valid === false) })

    // Take the original and concatenate our new error values to it
    return super.handleError(value, arr.concat(local))
  }

  render () {
    const klass = `birthdate ${this.props.className || ''}`.trim()
    const klassError = `${this.state.error ? 'usa-input-error' : ''}`.trim()

    return (
      <div className={klass}>
        <Field title={i18n.t('identification.birthdate.title')}
               titleSize="h2"
               help="identification.birthdate.help"
               adjustFor="labels"
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name={this.props.name}
                       {...this.props.Date}
                       className={klassError}
                       onUpdate={this.onUpdate}
                       onError={this.handleError}
                       required={this.props.required}
                       />
        </Field>
      </div>
    )
  }
}

ApplicantBirthDate.defaultProps = {
  Date: {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'birthdate',
  onUpdate: (queue) => {},
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('identification.birthdate', props))
  }
}

ApplicantBirthDate.errors = [
  {
    code: 'birthdate.age',
    func: (value, props) => {
      if (!value || isNaN(value)) {
        return null
      }

      const m = now.getMonth() - value.getMonth()
      let age = now.getFullYear() - value.getFullYear()
      if (m < 0 || (m === 0 && now.getDate() < value.getDate())) {
        age--
      }

      return age > 16 && age < 130
    }
  }
]
