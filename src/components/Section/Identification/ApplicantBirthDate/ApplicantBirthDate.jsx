import React from 'react'
import { i18n } from '@config'

import schema from '@schema'
import validate from '@validators'
import { Field, DateControl, Show, Checkbox } from '@components/Form'

import connectIdentificationSection from '../IdentificationConnector'
import Subsection from '../../shared/Subsection'

import {
  IDENTIFICATION,
  IDENTIFICATION_BIRTH_DATE,
} from '@config/formSections/identification'

const sectionConfig = {
  section: IDENTIFICATION.name,
  store: IDENTIFICATION.store,
  subsection: IDENTIFICATION_BIRTH_DATE.name,
  storeKey: IDENTIFICATION_BIRTH_DATE.storeKey,
}

export class ApplicantBirthDate extends Subsection {
  constructor(props) {
    super(props)

    const { section, subsection, store, storeKey } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.state = {
      uid: `${subsection}-${super.guid()}`,
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
  update(queue) {
    this.props.onUpdate(this.storeKey, {
      Date: this.props.Date,
      Confirmed: this.props.Confirmed,
      ...queue
    })
  }

  updateDate(values) {
    this.update({
      Date: values,
      Confirmed: { value: '', checked: false }
    })
  }

  updateConfirmed(values) {
    this.update({
      Confirmed: values
    })
  }

  handleError(value, arr) {
    let local = [...arr]

    const hasMinMaxError = local.some(
      x => x.valid === false && (x.code === 'date.min' || x.code === 'date.max')
    )
    const birthdateValid =
      this.props.Confirmed && this.props.Confirmed.checked === true
        ? true
        : hasMinMaxError
          ? false
          : null

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

  confirmationError(value, arr) {
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

  render() {
    const klass = `section-content birthdate ${this.props.className ||
      ''}`.trim()

    return (
      <div className={klass} {...super.dataAttributes()}>
        <h1 className="section-header">{i18n.t('identification.destination.birthdate')}</h1>
        <Field
          title={i18n.t('identification.birthdate.title')}
          titleSize="h4"
          help="identification.birthdate.help"
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="birthdate"
            {...this.props.Date}
            relationship="Self"
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

ApplicantBirthDate.defaultProps = {
  Date: {},
  Confirmed: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  dispatch: () => {},
  validator: data => {
    return validate(schema('identification.birthdate', data))
  }
}

export default connectIdentificationSection(ApplicantBirthDate, sectionConfig)
