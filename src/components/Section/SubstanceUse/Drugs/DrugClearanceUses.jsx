import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { DrugClearanceUseValidator } from 'validators'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_DRUGS_CLEARANCE,
} from 'config/formSections/substanceUse'
import Subsection from 'components/Section/shared/Subsection'
import connectSubstanceUseSection from '../SubstanceUseConnector'
import DrugClearanceUse from './DrugClearanceUse'

const sectionConfig = {
  key: SUBSTANCE_USE_DRUGS_CLEARANCE.key,
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_DRUGS_CLEARANCE.name,
  storeKey: SUBSTANCE_USE_DRUGS_CLEARANCE.storeKey,
}

export class DrugClearanceUses extends Subsection {
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
      UsedDrugs: this.props.UsedDrugs,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateUsedDrugs = (values) => {
    this.update({
      UsedDrugs: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.InvolvementDates)
    const description = (o.Description || {}).value

    return Summary({
      type: i18n.t('substance.drugs.clearance.collection.itemType'),
      index,
      left: description,
      right: range,
      placeholder: i18n.t('substance.drugs.clearance.collection.summary'),
    })
  }

  render() {
    return (
      <div
        className="section-content drug-clearance-uses"
        data-section={SUBSTANCE_USE.key}
        data-subsection={SUBSTANCE_USE_DRUGS_CLEARANCE.key}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.drugs.clearance')}</h1>
        <Branch
          name="UsedDrugs"
          label={i18n.t('substance.drugs.heading.drugClearanceUses')}
          labelSize="h4"
          className="used-drugs"
          {...this.props.UsedDrugs}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateUsedDrugs}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.UsedDrugs.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={DrugClearanceUseValidator}
            description={i18n.t('substance.drugs.clearance.collection.description')}
            appendTitle={i18n.t('substance.drugs.clearance.collection.appendTitle')}
            appendLabel={i18n.t('substance.drugs.clearance.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <DrugClearanceUse
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugClearanceUses.defaultProps = {
  UsedDrugs: {},
  List: { items: [], branch: {} },
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'drugs/clearance',
  dispatch: () => {},
  validator: data => validate(schema('substance.drugs.clearance', data)),
  scrollToBottom: '',
}

export default connectSubstanceUseSection(DrugClearanceUses, sectionConfig)
