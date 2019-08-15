import React from 'react'

import i18n from 'util/i18n'
import { Summary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'

import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_DRUGS_PURCHASE,
} from 'config/formSections/substanceUse'
import * as formConfig from 'config/forms'
import { getNumberOfYearsString } from 'helpers/text'

import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import DrugInvolvement from './DrugInvolvement'

const sectionConfig = {
  key: SUBSTANCE_USE_DRUGS_PURCHASE.key,
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_DRUGS_PURCHASE.name,
  storeKey: SUBSTANCE_USE_DRUGS_PURCHASE.storeKey,
}

export class DrugInvolvements extends Subsection {
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
      Involved: this.props.Involved,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateInvolved = (values) => {
    this.update({
      Involved: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    let drug = (o.DrugType || {}).DrugType
    if (drug === 'Other') {
      drug = ((o.DrugType || {}).DrugTypeOther || {}).value
    }

    return Summary({
      type: i18n.t('substance.drugs.involvement.collection.itemType'),
      index,
      left: drug,
      right: null,
      placeholder: i18n.t('substance.drugs.involvement.collection.summary'),
    })
  }

  render() {
    const {
      formType, requireDrugWhileSafety, requireDrugWithClearance, requireDrugInFuture, errors,
    } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.SUBSTANCE_DRUG_USE_YEARS
    const numberOfYearsString = getNumberOfYearsString(years)

    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content drug-involvements"
        data-section={SUBSTANCE_USE.key}
        data-subsection={SUBSTANCE_USE_DRUGS_PURCHASE.key}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.drugs.purchase')}</h1>
        <Branch
          name="Involved"
          label={i18n.t('substance.drugs.heading.drugInvolvement', { numberOfYearsString })}
          labelSize="h4"
          className="involved"
          {...this.props.Involved}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateInvolved}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.Involved.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('substance.drugs.involvement.collection.description')}
            appendTitle={i18n.t('substance.drugs.involvement.collection.appendTitle')}
            appendLabel={i18n.t('substance.drugs.involvement.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <DrugInvolvement
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              requireDrugWhileSafety={requireDrugWhileSafety}
              requireDrugWithClearance={requireDrugWithClearance}
              requireDrugInFuture={requireDrugInFuture}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugInvolvements.defaultProps = {
  Involved: {},
  List: { items: [], branch: {} },
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'drugs/purchase',
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(DrugInvolvements, sectionConfig)
