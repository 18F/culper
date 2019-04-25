import React from 'react'
import { i18n } from 'config'

import schema from 'schema'
import validate from 'validators'
import { Name, Field } from 'components/Form'

import connectIdentificationSection from '../IdentificationConnector'
import Subsection from '../../shared/Subsection'

import {
  IDENTIFICATION,
  IDENTIFICATION_NAME,
} from 'config/formSections/identification'

const sectionConfig = {
  section: IDENTIFICATION.name,
  store: IDENTIFICATION.store,
  subsection: IDENTIFICATION_NAME.name,
  storeKey: IDENTIFICATION_NAME.storeKey,
}

export class ApplicantName extends Subsection {
  constructor(props) {
    super(props)

    const { section, subsection, store, storeKey } = sectionConfig

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
      ...queue
    })
  }

  updateName(values) {
    this.update({
      Name: values
    })
  }

  render() {
    const klass = `section-content applicant-name ${this.props.className ||
      ''}`.trim()

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
          scrollIntoView={this.props.scrollIntoView}>
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
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  dispatch: () => {},
  required: false,
  validator: data => {
    return validate(schema('identification.name', data))
  }
}

ApplicantName.errors = []

export default connectIdentificationSection(ApplicantName, sectionConfig)
