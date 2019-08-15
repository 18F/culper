import React from 'react'
import { i18n } from 'config'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_ALCOHOL_ADDITIONAL,
} from 'config/formSections/substanceUse'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import ReceivedCounseling from './ReceivedCounseling'

const sectionConfig = {
  key: SUBSTANCE_USE_ALCOHOL_ADDITIONAL.key,
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_ALCOHOL_ADDITIONAL.name,
  storeKey: SUBSTANCE_USE_ALCOHOL_ADDITIONAL.storeKey,
}

export class ReceivedCounselings extends Subsection {
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
      ReceivedTreatment: this.props.ReceivedTreatment,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateReceivedTreatment = (values) => {
    this.update({
      ReceivedTreatment: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const counselor = o.TreatmentProviderName
      ? o.TreatmentProviderName.value
      : ''
    const counselingDates = DateSummary({
      from: o.TreatmentBeganDate,
      to: o.TreatmentEndDate,
    })

    return Summary({
      type: i18n.t('substance.alcohol.receivedCounseling.collection.itemType'),
      index,
      left: counselor,
      right: counselingDates,
      placeholder: i18n.t('substance.alcohol.receivedCounseling.collection.summary'),
    })
  }

  render() {
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content received-counselings"
        data-section={SUBSTANCE_USE.key}
        data-subsection={SUBSTANCE_USE_ALCOHOL_ADDITIONAL.key}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.alcohol.additional')}</h1>
        <Branch
          name="ReceivedTreatment"
          label={i18n.t('substance.alcohol.heading.receivedCounseling')}
          labelSize="h4"
          className="received-treatment"
          {...this.props.ReceivedTreatment}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateReceivedTreatment}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.ReceivedTreatment.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('substance.alcohol.receivedCounseling.collection.description')}
            appendTitle={i18n.t('substance.alcohol.receivedCounseling.collection.appendTitle')}
            appendLabel={i18n.t('substance.alcohol.receivedCounseling.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <ReceivedCounseling
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

ReceivedCounselings.defaultProps = {
  ReceivedTreatment: {},
  List: Accordion.defaultList,
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'alcohol/additional',
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(ReceivedCounselings, sectionConfig)
