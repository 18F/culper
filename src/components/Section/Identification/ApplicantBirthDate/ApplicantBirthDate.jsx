import React from 'react'
import { i18n } from 'config'
import { DateTime } from 'luxon'
import {
  Field, DateControl, Show, Checkbox,
} from 'components/Form'

import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'

import {
  IDENTIFICATION,
  IDENTIFICATION_BIRTH_DATE,
} from 'config/formSections/identification'

const sectionConfig = {
  key: IDENTIFICATION_BIRTH_DATE.key,
  section: IDENTIFICATION.name,
  store: IDENTIFICATION.store,
  subsection: IDENTIFICATION_BIRTH_DATE.name,
  storeKey: IDENTIFICATION_BIRTH_DATE.storeKey,
}

export class ApplicantBirthDate extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.state = {
      uid: `${subsection}-${super.guid()}`,
      errors: [],
      needsConfirmation: false,
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
  update(queue) {
    this.props.onUpdate(this.storeKey, {
      Date: this.props.Date,
      Confirmed: this.props.Confirmed,
      ...queue,
    })
  }

  updateDate(values) {
    this.update({
      Date: values,
      Confirmed: { value: '', checked: false },
    })
  }

  updateConfirmed(values) {
    this.update({
      Confirmed: values,
    })
  }

  handleError(value, arr) {
    let local = [...arr]

    //too old
    const hasMinError = local.some(
      x => (x.valid === false) && (x.code === 'date.min')
    )
    
    //too young
    const hasMaxError = local.some(
      x => (x.valid === false) && (x.code === 'date.max')
    )

    let birthdateValid = null
    if (this.props.Confirmed && this.props.Confirmed.checked === true) birthdateValid = true
    else if (hasMinError || hasMaxError) birthdateValid = false

    local.push({
      code: 'birthdate.age.max',
      valid: !hasMaxError,
      uid: this.state.uid,
    })

    local.push({
      code: 'birthdate.age.min',
      valid: !hasMinError,
      uid: this.state.uid,
    })

    local = local.filter(x => x.code !== 'date.min' && x.code !== 'date.max')

    // Store the errors
    this.setState({ errors: local, needsConfirmation: hasMaxError })

    // Take the original and concatenate our new error values to it
    return super.handleError(value, local)
  }

  confirmationError(value) {
    let local = [...this.state.errors] // eslint-disable-line
    local = local.filter(x => x.code !== 'birthdate.age.max')
    local.push({
      code: 'birthdate.age.max',
      valid: value,
      uid: this.state.uid,
    })

    // Store the errors
    this.setState({ errors: local })

    // Take the original and concatenate our new error values to it
    return super.handleError(value, local)
  }

  render() {
    const klass = `section-content birthdate ${this.props.className || ''}`.trim()

    return (
      <div
        className={klass}
        data-section={IDENTIFICATION.key}
        data-subsection={IDENTIFICATION_BIRTH_DATE.key}
      >
        <h1 className="section-header">{i18n.t('identification.destination.birthdate')}</h1>
        <Field
          title={i18n.t('identification.birthdate.title')}
          titleSize="h4"
          help="identification.birthdate.help"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateControl
            name="birthdate"
            {...this.props.Date}
            relationship="Self"
            
            maxDate={TODAY}
            overrideError={(this.props.Confirmed || {}).checked}
            onUpdate={this.updateDate}
            onError={this.handleError}
            required={this.props.required}
          />

          <Show when={this.state.needsConfirmation}>
            <Checkbox
              {...this.props.Confirmed}
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
const TODAY = DateTime.local()
ApplicantBirthDate.defaultProps = {
  Date: {},
  Confirmed: {},
  onUpdate: () => { },
  onError: (value, arr) => arr,
  dispatch: () => { },
}

export default connectSubsection(ApplicantBirthDate, sectionConfig)
