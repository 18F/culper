import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { DrugPrescriptionUseValidator } from 'validators'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_DRUGS_MISUSE,
} from 'config/formSections/substanceUse'
import Subsection from 'components/Section/shared/Subsection'
import connectSubstanceUseSection from '../SubstanceUseConnector'
import PrescriptionUse from './PrescriptionUse'

const sectionConfig = {
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_DRUGS_MISUSE.name,
  storeKey: SUBSTANCE_USE_DRUGS_MISUSE.storeKey,
}

export class PrescriptionUses extends Subsection {
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

  update = (updateValues) => {
    this.props.onUpdate(this.storeKey, {
      MisusedDrugs: this.props.MisusedDrugs,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateMisusedDrugs = (values) => {
    this.update({
      MisusedDrugs: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.InvolvementDates)
    const name = (o.PrescriptionName || {}).value

    return Summary({
      type: i18n.t('substance.drugs.prescription.collection.itemType'),
      index,
      left: name,
      right: range,
      placeholder: i18n.t('substance.drugs.prescription.collection.summary'),
    })
  }

  render() {
    return (
      <div
        className="section-content prescription-uses"
        {...super.dataAttributes(this.props)}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.drugs.misuse')}</h1>
        <Branch
          name="Misused"
          label={i18n.t('substance.drugs.heading.prescriptionUses')}
          labelSize="h4"
          className="misused"
          {...this.props.MisusedDrugs}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateMisusedDrugs}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.MisusedDrugs.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={DrugPrescriptionUseValidator}
            description={i18n.t('substance.drugs.prescription.collection.description')}
            appendTitle={i18n.t('substance.drugs.prescription.collection.appendTitle')}
            appendLabel={i18n.t('substance.drugs.prescription.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <PrescriptionUse
              name="Item"
              bind
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

PrescriptionUses.defaultProps = {
  MisusedDrugs: {},
  List: { items: [], branch: {} },
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'drugs/misuse',
  dispatch: () => {},
  validator: data => validate(schema('substance.drugs.misuse', data)),
  scrollToBottom: '',
}

export default connectSubstanceUseSection(PrescriptionUses, sectionConfig)
