import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { ForeignBusinessConferencesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateRange } from '../../../Form'
import ConferenceContacts from './ConferenceContacts'

export default class Conferences extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignConferences = this.updateHasForeignConferences.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignConferences: this.props.HasForeignConferences,
      ...queue
    })
  }

  updateHasForeignConferences (value) {
    this.update({
      HasForeignConferences: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = item || {}
    const date = DateSummary(item.Dates)
    const city = (obj.City || {}).value || ''

    return Summary({
      type: i18n.t('foreign.business.conferences.collection.summary.item'),
      index: index,
      left: city,
      right: date,
      placeholder: i18n.m('foreign.business.conferences.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-conferences">
        <Branch name="has_foreign_conferences"
                label={i18n.t('foreign.business.conferences.heading.title')}
                labelSize="h3"
                adjustFor="p"
                help="foreign.business.conferences.help.branch"
                value={this.props.HasForeignConferences}
                warning={true}
                onUpdate={this.updateHasForeignConferences}
                onError={this.handleError}>
          {i18n.m('foreign.business.conferences.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignConferences === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.conferences.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.conferences.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.conferences.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.conferences.collection.append')}>
            <Field title={i18n.t('foreign.business.conferences.heading.description')}
                   help="foreign.business.conferences.help.description">
              <Textarea name="Description"
                        className="conferences-description"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.sponsor')}
                   help="foreign.business.conferences.help.sponsor">
              <Text name="Sponsor"
                    className="conferences-sponsor"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.city')}
                   help="foreign.business.conferences.help.city">
              <Text name="City"
                    className="conferences-city"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.country')}
                   help="foreign.business.conferences.help.country">
              <Country name="Country"
                       className="conferences-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.dates')}
                   help="foreign.business.conferences.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="conferences-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.conferences.heading.purpose')}
                   help="foreign.business.conferences.help.purpose">
              <Textarea name="Purpose"
                        className="conferences-purpose"
                        bind={true}
                        />
            </Field>

            <ConferenceContacts name="Contacts"
                                bind={true}
                                />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Conferences.defaultProps = {
  name: 'Conferences',
  HasForeignConferences: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/conferences',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessConferencesValidator(props, props).isValid()
  },
  defaultState: true
}
