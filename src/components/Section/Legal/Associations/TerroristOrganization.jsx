import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsTerroristValidator } from '../../../../validators'
import { DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateRange, Location, Text, Textarea, NotApplicable } from '../../../Form'

export default class TerroristOrganization extends SubsectionElement {
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
      HasTerrorist: this.props.HasTerrorist,
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
      HasTerrorist: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const type = i18n.t('legal.associations.terrorist.collection.item')
    const unknown = i18n.m('legal.associations.terrorist.collection.unknown')
    const o = item || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value
          ? o.Organization.value
          : dates === '' ? unknown : ''

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
      <div className="legal-associations-terrorist">
        {i18n.m('legal.associations.terrorist.para.intro')}

        <Branch name="has_terrorist"
                label={i18n.t('legal.associations.terrorist.heading.title')}
                labelSize="h3"
                className="legal-associations-terrorist-has-terrorist"
                value={this.props.HasTerrorist}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasTerrorist === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.associations.terrorist.collection.description')}
                     appendTitle={i18n.t('legal.associations.terrorist.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.terrorist.collection.appendLabel')}>
            <Field title={i18n.t('legal.associations.terrorist.heading.organization')}
                   help="legal.associations.terrorist.help.organization"
                   adjustFor="text">
              <Text name="Organization"
                    className="legal-associations-terrorist-organization"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('legal.associations.terrorist.heading.address')}
                   help="legal.associations.terrorist.help.address"
                   adjustFor="address">
              <Location name="Address"
                        className="legal-associations-terrorist-address"
                        layout={Location.ADDRESS}
                        geocode={true}
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('legal.associations.terrorist.heading.dates')}
                   help="legal.associations.terrorist.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="legal-associations-terrorist-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('legal.associations.terrorist.heading.positions')}
                   help="legal.associations.terrorist.help.positions"
                   adjustFor="text">
              <NotApplicable name="PositionsNotApplicable"
                             or={i18n.m('legal.associations.terrorist.para.or')}
                             label={i18n.t('legal.associations.terrorist.label.noposition')}
                             bind={true}>
                <Text name="Positions"
                      className="legal-associations-terrorist-positions"
                      bind={true}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.associations.terrorist.heading.contributions')}
                   help="legal.associations.terrorist.help.contributions"
                   adjustFor="text">
              <NotApplicable name="ContributionsNotApplicable"
                             or={i18n.m('legal.associations.terrorist.para.or')}
                             label={i18n.t('legal.associations.terrorist.label.nocontribs')}
                             bind={true}>
                <Text name="Contributions"
                      className="legal-associations-terrorist-contributions"
                      bind={true}
                      />
              </NotApplicable>
            </Field>

            <Field title={i18n.t('legal.associations.terrorist.heading.reasons')}
                   help="legal.associations.terrorist.help.reasons"
                   adjustFor="textarea">
              <Textarea name="Reasons"
                        className="legal-associations-terrorist-reasons"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

TerroristOrganization.defaultProps = {
  name: 'terrorist-organization',
  HasTerroristOrganization: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/terrorist-organization',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalAssociationsTerroristValidator(state, props).isValid()
  }
}
