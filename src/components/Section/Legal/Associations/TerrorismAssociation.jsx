import React from 'react'
import { i18n } from 'config'
import {
  Branch,
  Show,
  Field,
  Textarea,
} from 'components/Form'
import {
  LEGAL,
  LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'

const sectionConfig = {
  key: LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION.key,
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION.name,
  storeKey: LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION.storeKey,
}

export class TerrorismAssociation extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      Explanation: this.props.Explanation,
      HasTerrorism: this.props.HasTerrorism,
      ...queue,
    })
  }

  updateExplanation = (values) => {
    this.update({
      Explanation: values,
    })
  }

  updateBranch = (values) => {
    this.update({
      HasTerrorism: values,
      Explanation: values.value === 'Yes' ? this.props.Explanation : {},
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-terrorism"
        data-section={LEGAL.key}
        data-subsection={LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.associations.terrorismAssociation')}</h1>
        <Branch
          name="has_terrorsim"
          label={i18n.t('legal.associations.terrorism.heading.title')}
          labelSize="h4"
          className="legal-associations-terrorism-has-terrorism"
          {...this.props.HasTerrorism}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasTerrorism.value === 'Yes'}>
          <Field
            title={i18n.t('legal.associations.terrorism.heading.explanation')}
            adjustFor="textarea"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Textarea
              name="Explanation"
              {...this.props.Explanation}
              className="legal-associations-terrorism-explanation"
              onError={this.handleError}
              required={this.props.required}
              onUpdate={this.updateExplanation}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

TerrorismAssociation.defaultProps = {
  name: 'terrorism',
  HasTerrorism: {},
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'associations/terrorism-association',
  dispatch: () => {},
  errors: [],
}

export default connectSubsection(TerrorismAssociation, sectionConfig)
