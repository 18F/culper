import React from 'react'
import { i18n } from 'config'

import schema from 'schema'
import validate from 'validators'
import { Name, Field } from 'components/Form'

import {
  IDENTIFICATION,
  IDENTIFICATION_NAME,
} from 'config/formSections/identification'

import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'

const sectionConfig = {
  key: IDENTIFICATION_NAME.key,
  section: IDENTIFICATION.name,
  store: IDENTIFICATION.store,
  subsection: IDENTIFICATION_NAME.name,
  storeKey: IDENTIFICATION_NAME.storeKey,
}

export class ApplicantName extends Subsection {
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
    this.updateName = this.updateName.bind(this)
  }

  update(queue) {
    this.props.onUpdate(this.storeKey, {
      Name: this.props.Name,
      ...queue,
    })
  }

  updateName(values) {
    this.update({
      Name: values,
    })
  }

  render() {
    const klass = `section-content applicant-name ${this.props.className
      || ''}`.trim()

    return (
      <div
        className={klass}
        data-section={IDENTIFICATION.key}
        data-subsection={IDENTIFICATION_NAME.key}
      >
        <h1 className="section-header">{i18n.t('identification.destination.name')}</h1>
        <Field
          title={i18n.t('identification.name.title')}
          titleSize="h4"
          optional={true}
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}
          adjustFor="labels"
        >
          <label className="name-label">{i18n.t('identification.name.info')}</label> {/* eslint-disable-line */}
          <Name
            name="name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.handleError}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>
      </div>
    )
  }
}

ApplicantName.defaultProps = {
  Name: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  required: false,
  validator: data => validate(schema('identification.name', data)) === true,
}

ApplicantName.errors = []

export default connectSubsection(ApplicantName, sectionConfig)
