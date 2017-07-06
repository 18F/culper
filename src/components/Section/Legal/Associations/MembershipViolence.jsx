import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsViolenceValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateRange, Address, Text, Textarea, NotApplicable } from '../../../Form'

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
    const type = i18n.t('legal.associations.violence.collection.item')
    const unknown = i18n.t('legal.associations.violence.collection.unknown')
    const o = item || {}
    const details = (o.Organization || {}).value
          ? o.Organization.value
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
      <div className="legal-associations-violence">
        <Branch name="has_violence"
                label={i18n.t('legal.associations.violence.heading.title')}
                labelSize="h3"
                className="legal-associations-violence-has-violence"
                value={this.props.HasViolence}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasViolence === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.associations.violence.collection.description')}
                     appendTitle={i18n.t('legal.associations.violence.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.violence.collection.appendLabel')}>
            <Field title={i18n.t('legal.associations.violence.heading.organization')}
                   help="legal.associations.violence.help.organization"
                   adjustFor="text">
              <Text name="Organization"
                    className="legal-associations-violence-organization"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.address')}
                   help="legal.associations.violence.help.address"
                   adjustFor="address">
              <Address name="Address"
                       className="legal-associations-violence-address"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.dates')}
                   help="legal.associations.violence.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="legal-associations-violence-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.positions')}
                   help="legal.associations.violence.help.positions"
                   adjustFor="text">
              <NotApplicable name="PositionsNotApplicable"
                             or={i18n.m('legal.associations.violence.para.or')}
                             label={i18n.t('legal.associations.violence.label.noposition')}
                             bind={true}>
                <Text name="Positions"
                      className="legal-associations-violence-positions"
                      bind={true}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.contributions')}
                   help="legal.associations.violence.help.contributions"
                   adjustFor="text">
              <NotApplicable name="ContributionsNotApplicable"
                             or={i18n.m('legal.associations.violence.para.or')}
                             label={i18n.t('legal.associations.violence.label.nocontribs')}
                             bind={true}>
                <Text name="Contributions"
                      className="legal-associations-violence-contributions"
                      bind={true}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.associations.violence.heading.reasons')}
                   help="legal.associations.violence.help.reasons"
                   adjustFor="textarea">
              <Textarea name="Reasons"
                        className="legal-associations-violence-reasons"
                        bind={true}
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
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalAssociationsViolenceValidator(state, props).isValid()
  }
}
