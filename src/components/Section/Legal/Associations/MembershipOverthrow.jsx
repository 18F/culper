import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsOverthrowValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateRange, Location, Text, Textarea, NotApplicable } from '../../../Form'

export default class MembershipOverthrow extends SubsectionElement {
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
      HasOverthrow: this.props.HasOverthrow,
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
      HasOverthrow: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = item || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.overthrow.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.m('legal.associations.overthrow.collection.unknown')
    })
  }

  render () {
    return (
      <div className="legal-associations-overthrow">
        <Branch name="has_overthrow"
                label={i18n.t('legal.associations.overthrow.heading.title')}
                labelSize="h3"
                className="legal-associations-overthrow-has-overthrow"
                value={this.props.HasOverthrow}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateBranch}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasOverthrow === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.associations.overthrow.collection.description')}
                     appendTitle={i18n.t('legal.associations.overthrow.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.overthrow.collection.appendLabel')}
                     scrollIntoView={this.props.scrollIntoView}>
            <Field title={i18n.t('legal.associations.overthrow.heading.organization')}
                   help="legal.associations.overthrow.help.organization"
                   adjustFor="text"
                   scrollIntoView={this.props.scrollIntoView}>
              <Text name="Organization"
                    className="legal-associations-overthrow-organization"
                    bind={true}
                    required={this.props.required}
                    />
            </Field>

            <Field title={i18n.t('legal.associations.overthrow.heading.address')}
                   help="legal.associations.overthrow.help.address"
                   adjustFor="address"
                   scrollIntoView={this.props.scrollIntoView}>
              <Location name="Address"
                        className="legal-associations-overthrow-address"
                        layout={Location.ADDRESS}
                        geocode={true}
                        bind={true}
                        required={this.props.required}
                        />
            </Field>

            <Field title={i18n.t('legal.associations.overthrow.heading.dates')}
                   help="legal.associations.overthrow.help.dates"
                   adjustFor="daterange"
                   scrollIntoView={this.props.scrollIntoView}>
              <DateRange name="Dates"
                         className="legal-associations-overthrow-dates"
                         bind={true}
                         required={this.props.required}
                         />
            </Field>

            <Field title={i18n.t('legal.associations.overthrow.heading.positions')}
                   help="legal.associations.overthrow.help.positions"
                   adjustFor="text"
                   scrollIntoView={this.props.scrollIntoView}>
              <NotApplicable name="PositionsNotApplicable"
                             or={i18n.m('legal.associations.overthrow.para.or')}
                             label={i18n.t('legal.associations.overthrow.label.noposition')}
                             required={this.props.required}
                             bind={true}>
                <Text name="Positions"
                      className="legal-associations-overthrow-positions"
                      bind={true}
                      required={this.props.required}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.associations.overthrow.heading.contributions')}
                   help="legal.associations.overthrow.help.contributions"
                   adjustFor="text"
                   scrollIntoView={this.props.scrollIntoView}>
              <NotApplicable name="ContributionsNotApplicable"
                             or={i18n.m('legal.associations.overthrow.para.or')}
                             label={i18n.t('legal.associations.overthrow.label.nocontribs')}
                             required={this.props.required}
                             bind={true}>
                <Text name="Contributions"
                      className="legal-associations-overthrow-contributions"
                      bind={true}
                      required={this.props.required}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.associations.overthrow.heading.reasons')}
                   help="legal.associations.overthrow.help.reasons"
                   adjustFor="textarea"
                   scrollIntoView={this.props.scrollIntoView}>
              <Textarea name="Reasons"
                        className="legal-associations-overthrow-reasons"
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

MembershipOverthrow.defaultProps = {
  name: 'overthrow',
  HasOverthrow: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/membership-overthrow',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalAssociationsOverthrowValidator(state, props).isValid()
  }
}
