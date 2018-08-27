import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import SubsectionElement from '../../SubsectionElement'
import validate, { ActivitiesValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show } from '../../../Form'
import ActivitiesToOverthrowItem from './ActivitiesToOverthrowItem'

export default class ActivitiesToOverthrow extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasActivities: this.props.HasActivities,
      ...queue
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  updateBranch(values) {
    this.update({
      HasActivities: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary(item, index) {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Reasons || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.activities.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.activities.collection.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-activities"
        {...super.dataAttributes(this.props)}>
        <Branch
          name="has_activities"
          label={i18n.t('legal.associations.activities.heading.title')}
          labelSize="h2"
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
            description={i18n.t(
              'legal.associations.activities.collection.description'
            )}
            appendTitle={i18n.t(
              'legal.associations.activities.collection.appendTitle'
            )}
            appendLabel={i18n.t(
              'legal.associations.activities.collection.appendLabel'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
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
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'associations/activities-to-overthrow',
  dispatch: () => {},
  validator: data => {
    return validate(schema('legal.associations.activities-to-overthrow', data))
  },
  scrollToBottom: ''
}
