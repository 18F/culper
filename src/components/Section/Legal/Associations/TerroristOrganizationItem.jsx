import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Field, DateRange, Location, Text, Textarea, NotApplicable } from '../../../Form'

export default class TerroristOrganizationItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateOrganization = this.updateOrganization.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updatePositionsNotApplicable = this.updatePositionsNotApplicable.bind(this)
    this.updatePositions = this.updatePositions.bind(this)
    this.updateContributionsNotApplicable = this.updateContributionsNotApplicable.bind(this)
    this.updateContributions = this.updateContributions.bind(this)
    this.updateReasons = this.updateReasons.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Organization: this.props.Organization,
      Address: this.props.Address,
      Dates: this.props.Dates,
      PositionsNotApplicable: this.props.PositionsNotApplicable,
      Positions: this.props.Positions,
      ContributionsNotApplicable: this.props.ContributionsNotApplicable,
      Contributions: this.props.Contributions,
      Reasons: this.props.Reasons,
      ...queue
    })
  }

  updateOrganization (values) {
    this.update({
      Organization: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updatePositionsNotApplicable (values) {
    this.update({
      PositionsNotApplicable: values
    })
  }

  updatePositions (values) {
    this.update({
      Positions: values
    })
  }

  updateContributionsNotApplicable (values) {
    this.update({
      ContributionsNotApplicable: values
    })
  }

  updateContributions (values) {
    this.update({
      Contributions: values
    })
  }

  updateReasons (values) {
    this.update({
      Reasons: values
    })
  }

  render () {
    return (
      <div>
        <Field title={i18n.t('legal.associations.terrorist.heading.organization')}
               help="legal.associations.terrorist.help.organization"
               adjustFor="text"
               scrollIntoView={this.props.scrollIntoView}>
          <Text name="Organization"
                {...this.props.Organization}
                onUpdate={this.updateOrganization}
                onError={this.props.onError}
                className="legal-associations-terrorist-organization"
                required={this.props.required}
                />
        </Field>

        <Field title={i18n.t('legal.associations.terrorist.heading.address')}
               optional={true}
               help="legal.associations.terrorist.help.address"
               adjustFor="address"
               scrollIntoView={this.props.scrollIntoView}>
          <Location name="Address"
                    {...this.props.Address}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    className="legal-associations-terrorist-address"
                    layout={Location.ADDRESS}
                    geocode={true}
                    addressBooks={this.props.addressBooks}
                    addressBook="Organization"
                    dispatch={this.props.dispatch}
                    required={this.props.required}
                    />
        </Field>

        <Field title={i18n.t('legal.associations.terrorist.heading.dates')}
               help="legal.associations.terrorist.help.dates"
               adjustFor="daterange"
               scrollIntoView={this.props.scrollIntoView}>
          <DateRange name="Dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     className="legal-associations-terrorist-dates"
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('legal.associations.terrorist.heading.positions')}
               help="legal.associations.terrorist.help.positions"
               adjustFor="text"
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="PositionsNotApplicable"
                         {...this.props.PositionsNotApplicable}
                         className="legal-associations-terrorist-positions-na"
                         onUpdate={this.updatePositionsNotApplicable}
                         onError={this.props.onError}
                         or={i18n.m('legal.associations.terrorist.para.or')}
                         label={i18n.t('legal.associations.terrorist.label.noposition')}
                         required={this.props.required}>
            <Text name="Positions"
                  {...this.props.Positions}
                  onUpdate={this.updatePositions}
                  onError={this.props.onError}
                  className="legal-associations-terrorist-positions"
                  required={this.props.required}
                  />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('legal.associations.terrorist.heading.contributions')}
               help="legal.associations.terrorist.help.contributions"
               adjustFor="text"
               scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable name="ContributionsNotApplicable"
                         {...this.props.ContributionsNotApplicable}
                         className="legal-associations-terrorist-contributions-na"
                         onUpdate={this.updateContributionsNotApplicable}
                         onError={this.props.onError}
                         or={i18n.m('legal.associations.terrorist.para.or')}
                         label={i18n.t('legal.associations.terrorist.label.nocontribs')}
                         required={this.props.required}>
            <Text name="Contributions"
                  {...this.props.Contributions}
                  onUpdate={this.updateContributions}
                  onError={this.props.onError}
                  className="legal-associations-terrorist-contributions"
                  required={this.props.required}
                  />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('legal.associations.terrorist.heading.reasons')}
               help="legal.associations.terrorist.help.reasons"
               adjustFor="textarea"
               scrollIntoView={this.props.scrollIntoView}>
          <Textarea name="Reasons"
                    {...this.props.Reasons}
                    onUpdate={this.updateReasons}
                    onError={this.props.onError}
                    className="legal-associations-terrorist-reasons"
                    required={this.props.required}
                    />
        </Field>
      </div>
    )
  }
}

TerroristOrganizationItem.defaultProps = {
  PositionsNotApplicable: { applicable: true },
  ContributionsNotApplicable: { applicable: true },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
