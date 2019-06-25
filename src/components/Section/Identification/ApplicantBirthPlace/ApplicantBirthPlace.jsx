import React from 'react'

import { i18n } from 'config'
import schema from 'schema'
import validate from 'validators'
import { Location, Field } from 'components/Form'

import {
  IDENTIFICATION,
  IDENTIFICATION_BIRTH_PLACE,
} from 'config/formSections/identification'
import connectIdentificationSection from '../IdentificationConnector'
import Subsection from '../../shared/Subsection'


const sectionConfig = {
  section: IDENTIFICATION.name,
  store: IDENTIFICATION.store,
  subsection: IDENTIFICATION_BIRTH_PLACE.name,
  storeKey: IDENTIFICATION_BIRTH_PLACE.storeKey,
}

export class ApplicantBirthPlace extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.update = this.update.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
  }

  update(queue) {
    this.props.onUpdate(this.storeKey, {
      Location: this.props.Location,
      ...queue,
    })
  }

  updateLocation(values) {
    this.update({
      Location: values,
    })
  }

  render() {
    const klass = `section-content applicant-birthplace ${this.props.className || ''}`.trim()

    return (
      <div
        className={klass}
        data-section={IDENTIFICATION.key}
        data-subsection={IDENTIFICATION_BIRTH_PLACE.key}
      >
        <h1 className="section-header">{i18n.t('identification.destination.birthplace')}</h1>
        <Field
          title={i18n.t('identification.birthplace.title')}
          titleSize="h4"
          scrollIntoView={this.props.scrollIntoView}
        >
          <Location
            name="birthplace"
            {...this.props.Location}
            layout={Location.BIRTHPLACE}
            stateLabel={i18n.t('identification.birthplace.label.state')}
            cityLabel={i18n.t('identification.birthplace.label.city')}
            countyLabel={i18n.t('identification.birthplace.label.county')}
            countryLabel={i18n.t('identification.birthplace.label.country')}
            onUpdate={this.updateLocation}
            onError={this.handleError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

ApplicantBirthPlace.defaultProps = {
  Location: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('identification.birthplace', data)),
}

ApplicantBirthPlace.errors = []

export default connectIdentificationSection(ApplicantBirthPlace, sectionConfig)
