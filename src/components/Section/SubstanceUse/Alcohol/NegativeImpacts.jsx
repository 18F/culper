import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { NegativeImpactValidator } from 'validators'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_ALCOHOL_NEGATIVE,
} from 'config/formSections/substanceUse'
import Subsection from 'components/Section/shared/Subsection'
import connectSubstanceUseSection from '../SubstanceUseConnector'
import NegativeImpact from './NegativeImpact'

const sectionConfig = {
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_ALCOHOL_NEGATIVE.name,
  storeKey: SUBSTANCE_USE_ALCOHOL_NEGATIVE.storeKey,
}

export class NegativeImpacts extends Subsection {
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
      HasImpacts: this.props.HasImpacts,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHasImpacts = (values) => {
    this.update({
      HasImpacts: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const occurred = DateSummary(o.Occurred)

    return Summary({
      type: i18n.t('substance.alcohol.negativeImpact.collection.itemType'),
      index,
      left: occurred,
      right: null,
      placeholder: i18n.t('substance.alcohol.negativeImpact.collection.summary'),
    })
  }

  render() {
    return (
      <div
        className="section-content negative-impacts"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.alcohol.negative')}</h1>
        <Branch
          name="has_impacts"
          label={i18n.t('substance.alcohol.heading.negativeImpact')}
          labelSize="h4"
          className="has-impacts"
          {...this.props.HasImpacts}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateHasImpacts}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasImpacts.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={NegativeImpactValidator}
            description={i18n.t('substance.alcohol.negativeImpact.collection.description')}
            appendTitle={i18n.t('substance.alcohol.negativeImpact.collection.appendTitle')}
            appendLabel={i18n.t('substance.alcohol.negativeImpact.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <NegativeImpact
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

NegativeImpacts.defaultProps = {
  HasImpacts: {},
  List: Accordion.defaultList,
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'alcohol/negative',
  dispatch: () => {},
  validator: data => validate(schema('substance.alcohol.negative', data)),
  scrollToBottom: '',
}

export default connectSubstanceUseSection(NegativeImpacts, sectionConfig)
