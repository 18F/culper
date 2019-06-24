import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Field,
  DateRange,
  Location,
  Currency,
  Text,
  Textarea,
  NotApplicable,
} from '../../../Form'

export default class MembershipOverthrowItem extends ValidationElement {
  update = (queue) => {
    this.props.onUpdate({
      Organization: this.props.Organization,
      Address: this.props.Address,
      Dates: this.props.Dates,
      PositionsNotApplicable: this.props.PositionsNotApplicable,
      Positions: this.props.Positions,
      ContributionsNotApplicable: this.props.ContributionsNotApplicable,
      Contributions: this.props.Contributions,
      Reasons: this.props.Reasons,
      ...queue,
    })
  }

  updateOrganization = (values) => {
    this.update({
      Organization: values,
    })
  }

  updateAddress = (values) => {
    this.update({
      Address: values,
    })
  }

  updateDates = (values) => {
    this.update({
      Dates: values,
    })
  }

  updatePositionsNotApplicable = (values) => {
    this.update({
      Positions: values.applicable ? this.props.Positions : {},
      PositionsNotApplicable: values,
    })
  }

  updatePositions = (values) => {
    this.update({
      Positions: values,
    })
  }

  updateContributionsNotApplicable = (values) => {
    this.update({
      Contributions: values.applicable ? this.props.Contributions : {},
      ContributionsNotApplicable: values,
    })
  }

  updateContributions = (values) => {
    this.update({
      Contributions: values,
    })
  }

  updateReasons = (values) => {
    this.update({
      Reasons: values,
    })
  }

  render() {
    return (
      <div>
        <Field
          title={i18n.t('legal.associations.overthrow.heading.organization')}
          adjustFor="text"
          scrollIntoView={this.props.scrollIntoView}
        >
          <Text
            name="Organization"
            {...this.props.Organization}
            onUpdate={this.updateOrganization}
            onError={this.props.onError}
            className="legal-associations-overthrow-organization"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.associations.overthrow.heading.address')}
          optional
          help="legal.associations.overthrow.help.address"
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}
        >
          <Location
            name="Address"
            {...this.props.Address}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            className="legal-associations-overthrow-address"
            layout={Location.ADDRESS}
            geocode
            addressBooks={this.props.addressBooks}
            addressBook="Organization"
            dispatch={this.props.dispatch}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.associations.overthrow.heading.dates')}
          help="legal.associations.overthrow.help.dates"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateRange
            name="Dates"
            {...this.props.Dates}
            minDateEqualTo
            onUpdate={this.updateDates}
            onError={this.props.onError}
            className="legal-associations-overthrow-dates"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('legal.associations.overthrow.heading.positions')}
          adjustFor="text"
          scrollIntoView={this.props.scrollIntoView}
        >
          <NotApplicable
            name="PositionsNotApplicable"
            {...this.props.PositionsNotApplicable}
            className="legal-associations-overthrow-positions-na"
            onUpdate={this.updatePositionsNotApplicable}
            onError={this.props.onError}
            or={i18n.m('legal.associations.overthrow.para.or')}
            label={i18n.t('legal.associations.overthrow.label.noposition')}
            required={this.props.required}
          >
            <Text
              name="Positions"
              {...this.props.Positions}
              onUpdate={this.updatePositions}
              onError={this.props.onError}
              className="legal-associations-overthrow-positions"
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('legal.associations.overthrow.heading.contributions')}
          adjustFor="text"
          scrollIntoView={this.props.scrollIntoView}
        >
          <NotApplicable
            name="ContributionsNotApplicable"
            {...this.props.ContributionsNotApplicable}
            className="legal-associations-overthrow-contributions-na"
            onUpdate={this.updateContributionsNotApplicable}
            onError={this.props.onError}
            or={i18n.m('legal.associations.overthrow.para.or')}
            label={i18n.t('legal.associations.overthrow.label.nocontribs')}
            required={this.props.required}
          >
            <Currency
              name="Contributions"
              {...this.props.Contributions}
              onUpdate={this.updateContributions}
              onError={this.props.onError}
              className="legal-associations-overthrow-contributions"
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('legal.associations.overthrow.heading.reasons')}
          adjustFor="textarea"
          scrollIntoView={this.props.scrollIntoView}
        >
          <Textarea
            name="Reasons"
            {...this.props.Reasons}
            onUpdate={this.updateReasons}
            onError={this.props.onError}
            className="legal-associations-overthrow-reasons"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

MembershipOverthrowItem.defaultProps = {
  PositionsNotApplicable: { applicable: true },
  ContributionsNotApplicable: { applicable: true },
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
