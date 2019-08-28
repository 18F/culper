import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ActivitiesValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import ActivitiesToOverthrowItem from './ActivitiesToOverthrowItem'

const sectionConfig = {
  key: LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW.key,
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW.name,
  storeKey: LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW.storeKey,
}

export class ActivitiesToOverthrow extends Subsection {
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
      List: this.props.List,
      HasActivities: this.props.HasActivities,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateBranch = (values) => {
    this.update({
      HasActivities: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Reasons || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.activities.collection.item'),
      index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.activities.collection.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-activities"
        data-section={LEGAL.key}
        data-subsection={LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.associations.activitiesOverthrow')}</h1>
        <Branch
          name="has_activities"
          label={i18n.t('legal.associations.activities.heading.title')}
          labelSize="h4"
          className="legal-associations-activities-has-activities"
          {...this.props.HasActivities}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasActivities.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ActivitiesValidator}
            description={i18n.t('legal.associations.activities.collection.description')}
            appendTitle={i18n.t('legal.associations.activities.collection.appendTitle')}
            appendLabel={i18n.t('legal.associations.activities.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <ActivitiesToOverthrowItem
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

ActivitiesToOverthrow.defaultProps = {
  name: 'activities',
  HasActivities: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'associations/activities-to-overthrow',
  dispatch: () => {},
  validator: data => validate(schema('legal.associations.activities-to-overthrow', data)),
  scrollToBottom: '',
}

export default connectSubsection(ActivitiesToOverthrow, sectionConfig)
