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
    let local = [...arr]
    local.push({
      code: 'birthdate.age',
      valid: local.some(x => (x.code === 'date.min' && x.valid === false) || (x.code === 'date.max' && x.valid === false)) ? false : null,
      uid: this.state.uid
    })
    local = local.filter(x => x.code !== 'date.min' && x.code !== 'date.max')

    this.setState({ error: local.some(x => x.valid === false) })

    // Take the original and concatenate our new error values to it
    return super.handleError(value, local)
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
                       relationship="Self"
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
