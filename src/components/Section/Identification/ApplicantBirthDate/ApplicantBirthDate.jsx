import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, DateControl, Show, Checkbox } from '../../../Form'

export default class ApplicantBirthDate extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      errors: [],
      needsConfirmation: false
    }

    this.update = this.update.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateConfirmed = this.updateConfirmed.bind(this)
    this.handleError = this.handleError.bind(this)
    this.confirmationError = this.confirmationError.bind(this)
  }

  /**
   * Handle the change event.
   */
  update (queue) {
    this.props.onUpdate({
      Date: this.props.Date,
      Confirmed: this.props.Confirmed,
      ...queue
    })
  }

  updateDate (values) {
    this.update({
      Date: values,
      Confirmed: { value: '', checked: false }
    })
  }

  updateConfirmed (values) {
    this.update({
      Confirmed: values
    })
  }

  handleError (value, arr) {
    let local = [...arr]

    const hasMinMaxError = local.some(x => x.valid === false && (x.code === 'date.min' || x.code === 'date.max'))
    const birthdateValid = this.props.Confirmed && this.props.Confirmed.checked === true
          ? true
          : hasMinMaxError ? false : null
    local.push({
      code: 'birthdate.age',
      valid: birthdateValid,
      uid: this.state.uid
    })
    local = local.filter(x => x.code !== 'date.min' && x.code !== 'date.max')

    // Store the errors
    this.setState({ errors: local, needsConfirmation: hasMinMaxError })

    // Take the original and concatenate our new error values to it
    return super.handleError(value, local)
  }

  confirmationError (value, arr) {
    let local = [...this.state.errors]
    local = local.filter(x => x.code !== 'birthdate.age')
    local.push({
      code: 'birthdate.age',
      valid: value,
      uid: this.state.uid
    })

    // Store the errors
    this.setState({ errors: local })

    // Take the original and concatenate our new error values to it
    return super.handleError(value, local)
  }

  render () {
    const klass = `section-content birthdate ${this.props.className || ''}`.trim()
    return (
      <div className={klass} {...super.dataAttributes(this.props)}>
        <Field title={i18n.t('identification.birthdate.title')}
               titleSize="h2"
               help="identification.birthdate.help"
               scrollIntoView={this.props.scrollIntoView}>
          <DateControl name={this.props.name}
                       {...this.props.Date}
                       relationship="Self"
                       overrideError={(this.props.Confirmed || {}).checked}
                       onUpdate={this.updateDate}
                       onError={this.handleError}
                       required={this.props.required}
                       />
          <Show when={this.state.needsConfirmation}>
            <Checkbox {...this.props.Confirmed}
                      name="Confirmed"
                      label={i18n.t('identification.birthdate.confirmation')}
                      value="Confirmed"
                      className="age-warning"
                      onUpdate={this.updateConfirmed}
                      onError={this.confirmationError}
                      required={this.state.needsConfirmation && this.props.required}
                      />
          </Show>
        </Field>
      </div>
    )
  }
}

ApplicantBirthDate.defaultProps = {
  Date: {},
  Confirmed: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'birthdate',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('identification.birthdate', data))
  }
}
