import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { OrderedCounselingValidator } from 'validators'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_ALCOHOL_ORDERED,
} from 'config/formSections/substanceUse'
import Subsection from 'components/Section/shared/Subsection'
import connectSubstanceUseSection from '../SubstanceUseConnector'
import OrderedCounseling from './OrderedCounseling'

const sectionConfig = {
  key: SUBSTANCE_USE_ALCOHOL_ORDERED.key,
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_ALCOHOL_ORDERED.name,
  storeKey: SUBSTANCE_USE_ALCOHOL_ORDERED.storeKey,
}

export class OrderedCounselings extends Subsection {
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
      HasBeenOrdered: this.props.HasBeenOrdered,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHasBeenOrdered = (values) => {
    this.update({
      HasBeenOrdered: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const counselingDates = DateSummary(o.CounselingDates)
    const counselingTypes = {
      Employer: 'Employer',
      MedicalProfessional: 'Medical professional',
      MentalHealthProfessional: 'Mental health professional',
      CourtOfficial: 'Court official',
      NotOrdered: 'Not ordered',
    }

    const seekers = []
    if (o.Seekers && o.Seekers.values) {
      o.Seekers.values.forEach((seeker) => {
        if (seeker === 'Other') {
          seekers.push((o.OtherSeeker || {}).value || 'Other')
        } else {
          seekers.push(counselingTypes[seeker])
        }
      })
    }

    return Summary({
      type: i18n.t('substance.alcohol.orderedCounseling.collection.itemType'),
      index,
      left: seekers.join(', '),
      right: counselingDates,
      placeholder: i18n.t('substance.alcohol.receivedCounseling.collection.summary'),
    })
  }

  render() {
    return (
      <div
        className="section-content ordered-counselings"
        data-section={SUBSTANCE_USE.key}
        data-subsection={SUBSTANCE_USE_ALCOHOL_ORDERED.key}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.alcohol.ordered')}</h1>
        <Branch
          name="HasBeenOrdered"
          label={i18n.t('substance.alcohol.heading.orderedCounseling')}
          labelSize="h4"
          className="has-been-ordered"
          {...this.props.HasBeenOrdered}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateHasBeenOrdered}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasBeenOrdered.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={OrderedCounselingValidator}
            description={i18n.t('substance.alcohol.orderedCounseling.collection.description')}
            appendTitle={i18n.t('substance.alcohol.orderedCounseling.collection.appendTitle')}
            appendLabel={i18n.t('substance.alcohol.orderedCounseling.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <OrderedCounseling
              name="Item"
              bind={true}
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OrderedCounselings.defaultProps = {
  HasBeenOrdered: {},
  List: Accordion.defaultList,
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'alcohol/ordered',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('substance.alcohol.ordered', data)),
  scrollToBottom: '',
}

export default connectSubstanceUseSection(OrderedCounselings, sectionConfig)
