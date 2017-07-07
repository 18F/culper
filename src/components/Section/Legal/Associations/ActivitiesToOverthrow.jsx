import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsActivitiesValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateRange, Textarea } from '../../../Form'

export default class ActivitiesToOverthrow extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasActivities: this.props.HasActivities,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateBranch (values) {
    this.update({
      HasActivities: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const type = i18n.t('legal.associations.activities.collection.item')
    const unknown = i18n.m('legal.associations.activities.collection.unknown')
    const o = item || {}
    const details = (o.Reasons || {}).value
          ? o.Reasons.value
          : unknown
    const dates = DateSummary(o.Dates)

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span><strong>{details}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="legal-associations-activities">
        <Branch name="has_activities"
                label={i18n.t('legal.associations.activities.heading.title')}
                labelSize="h3"
                className="legal-associations-activities-has-activities"
                value={this.props.HasActivities}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasActivities === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.associations.activities.collection.description')}
                     appendTitle={i18n.t('legal.associations.activities.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.activities.collection.appendLabel')}>
            <Field title={i18n.t('legal.associations.activities.heading.reasons')}
                   help="legal.associations.activities.help.reasons"
                   adjustFor="textarea">
              <Textarea name="Reasons"
                        className="legal-associations-activities-reasons"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('legal.associations.activities.heading.dates')}
                   help="legal.associations.activities.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="legal-associations-activities-dates"
                         bind={true}
                         />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

ActivitiesToOverthrow.defaultProps = {
  name: 'activities',
  HasActivities: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/activities-to-overthrow',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalAssociationsActivitiesValidator(state, props).isValid()
  }
}
