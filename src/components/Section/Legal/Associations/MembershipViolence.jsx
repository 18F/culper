import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsViolenceValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateRange, Location, Text, Textarea, NotApplicable } from '../../../Form'

export default class MembershipViolence extends SubsectionElement {
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
      HasViolence: this.props.HasViolence,
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
      HasViolence: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = item || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.violence.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.m('legal.associations.violence.collection.unknown')
    })
  }

  render () {
    return (
      <div className="legal-associations-violence">
        <Branch name="has_violence"
                label={i18n.t('legal.associations.violence.heading.title')}
                labelSize="h3"
                className="legal-associations-violence-has-violence"
                value={this.props.HasViolence}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasViolence === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.associations.violence.collection.description')}
                     appendTitle={i18n.t('legal.associations.violence.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.violence.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Field title={i18n.t('legal.associations.violence.heading.organization')}
                   help="legal.associations.violence.help.organization"
                   adjustFor="text"
                   scrollIntoView={this.props.scrollIntoView}>
              <Text name="Organization"
                    className="legal-associations-violence-organization"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.address')}
                   help="legal.associations.violence.help.address"
                   adjustFor="address"
                   scrollIntoView={this.props.scrollIntoView}>
              <Location name="Address"
                        className="legal-associations-violence-address"
                        layout={Location.ADDRESS}
                        geocode={true}
                        addressBooks={this.props.addressBooks}
                        addressBook="Organization"
                        dispatch={this.props.dispatch}
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.dates')}
                   help="legal.associations.violence.help.dates"
                   adjustFor="daterange"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateRange name="Dates"
                         className="legal-associations-violence-dates"
                         bind={true}
                         required={this.props.required}
                         />
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.positions')}
                   help="legal.associations.violence.help.positions"
                   adjustFor="text"
                   scrollIntoView={this.props.scrollIntoView}>
              <NotApplicable name="PositionsNotApplicable"
                             or={i18n.m('legal.associations.violence.para.or')}
                             label={i18n.t('legal.associations.violence.label.noposition')}
                             required={this.props.required}
                             bind={true}>
                <Text name="Positions"
                      className="legal-associations-violence-positions"
                      bind={true}
                      required={this.props.required}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.contributions')}
                   help="legal.associations.violence.help.contributions"
                   adjustFor="text"
                   scrollIntoView={this.props.scrollIntoView}>
              <NotApplicable name="ContributionsNotApplicable"
                             or={i18n.m('legal.associations.violence.para.or')}
                             label={i18n.t('legal.associations.violence.label.nocontribs')}
                             required={this.props.required}
                             bind={true}>
                <Text name="Contributions"
                      className="legal-associations-violence-contributions"
                      bind={true}
                      required={this.props.required}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.reasons')}
                   help="legal.associations.violence.help.reasons"
                   adjustFor="textarea"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Reasons"
                        className="legal-associations-violence-reasons"
                        bind={true}
                        required={this.props.required}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

MembershipViolence.defaultProps = {
  name: 'violence',
  HasViolence: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/membership-violence-or-force',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new LegalAssociationsViolenceValidator(state, props).isValid()
  },
  scrollToBottom: ''
}
