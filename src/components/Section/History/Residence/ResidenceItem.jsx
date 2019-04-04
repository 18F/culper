import React from 'react'

import i18n from 'util/i18n'

import {
  ValidationElement,
  DateRange,
  Text,
  RadioGroup,
  Radio,
  Field,
  Location,
  Show,
  Name,
  DateControl,
  CheckboxGroup,
  Checkbox,
  Telephone,
  NotApplicable,
  Email,
} from 'components/Form'
import ConnectedAlternateAddress from 'components/Form/Location/AlternateAddress'
import { today, daysAgo, extractDate } from '../dateranges'

// We need to determine how far back 3 years ago was
const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to, present) => (
  present || (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
)

/**
 * Residence item in a collection
 *
 * This was broken apart so it could manage minor local state in determining
 * when particular portions of this should be rendered.
 */
export default class ResidenceItem extends ValidationElement {
  /**
   * Handle any updates and bubble them up.
   */
  update = (queue) => {
    this.props.onUpdate({
      ...this.props,
      ...queue,
    })
  }

  updateReferenceName = (values) => {
    this.update({
      ReferenceName: values,
    })
  }

  updateReferenceLastContact = (values) => {
    this.update({
      ReferenceLastContact: values,
    })
  }

  updateReferenceRelationshipComments = (values) => {
    this.update({
      ReferenceRelationshipComments: values,
    })
  }

  updateReferenceRelationship = (values) => {
    const selected = [...((this.props.ReferenceRelationship || {}).values || [])]

    if (values.checked) {
      // Add the new relationship
      selected.push(values.value)
    } else if (selected.includes(values.value)) {
      // Remove the relationship if it was previously selected
      selected.splice(selected.indexOf(values.value), 1)
    }

    this.update({
      ReferenceRelationship: {
        values: selected,
      },
    })
  }

  updateReferenceRelationshipOther = (values) => {
    this.update({
      ReferenceRelationshipOther: values,
    })
  }

  updateReferencePhoneEvening = (values) => {
    this.update({
      ReferencePhoneEvening: values,
    })
  }

  updateReferencePhoneDay = (values) => {
    this.update({
      ReferencePhoneDay: values,
    })
  }

  updateReferencePhoneMobile = (values) => {
    this.update({
      ReferencePhoneMobile: values,
    })
  }

  updateReferenceEmailNotApplicable = (values) => {
    this.update({
      ReferenceEmailNotApplicable: values,
      ReferenceEmail: values.applicable ? this.props.ReferenceEmail : {},
    })
  }

  updateReferenceEmail = (values) => {
    this.update({
      ReferenceEmail: values,
    })
  }

  updateReferenceAddress = (values) => {
    this.update({
      ReferenceAddress: values,
    })
  }

  updateComments = (values) => {
    this.update({
      Comments: values,
    })
  }

  updateAddress = (values) => {
    this.update({
      Address: values,
    })
  }

  updateDates = (values) => {
    const dates = this.props.Dates || {}
    const { from, to } = dates
    const zeroReference = !withinThreeYears(from, to, dates.present)
    this.update({
      Dates: values,
      ReferenceName: zeroReference ? {} : this.props.ReferenceName,
      ReferenceLastContact: zeroReference
        ? {}
        : this.props.ReferenceLastContact,
      ReferenceRelationshipComments: zeroReference
        ? {}
        : this.props.ReferenceRelationshipComments,
      ReferenceRelationship: zeroReference
        ? {}
        : this.props.ReferenceRelationship,
      ReferenceRelationshipOther: zeroReference
        ? {}
        : this.props.ReferenceRelationshipOther,
      ReferencePhoneEvening: zeroReference
        ? {}
        : this.props.ReferencePhoneEvening,
      ReferencePhoneDay: zeroReference ? {} : this.props.ReferencePhoneDay,
      ReferencePhoneMobile: zeroReference
        ? {}
        : this.props.ReferencePhoneMobile,
      ReferenceEmailNotApplicable: zeroReference
        ? {}
        : this.props.ReferenceEmailNotApplicable,
      ReferenceEmail: zeroReference ? {} : this.props.ReferenceEmail,
      ReferenceAddress: zeroReference ? {} : this.props.ReferenceAddress,
    })
  }

  updateRole = (values) => {
    this.update({
      Role: values,
    })
  }

  updateRoleOther = (values) => {
    this.update({
      RoleOther: values,
    })
  }

  render() {
    // Certain elements are present if the date range of the residency was
    // within the last 3 years.
    const dates = this.props.Dates || {}
    const from = extractDate(dates.from)
    const to = extractDate(dates.to)

    return (
      <div className="residence">
        <Field
          title={i18n.t('history.residence.heading.address')}
          titleSize="h4"
          optional
          help="history.residence.help.address"
          comments={false}
          commentsName="Comments"
          commentsValue={this.props.Comments}
          commentsAdd="history.residence.label.comments"
          onUpdate={this.updateComments}
          onError={this.props.onError}
          adjustFor="address"
          shrink
          scrollIntoView={this.props.scrollIntoView}
        >
          <Location
            name="Address"
            {...this.props.Address}
            label={i18n.t('history.residence.label.address')}
            layout={Location.ADDRESS}
            geocode
            addressBook="Residence"
            addressBooks={this.props.addressBooks}
            showPostOffice
            dispatch={this.props.dispatch}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
        <ConnectedAlternateAddress
          address={this.props.AlternateAddress}
          belongingTo="AlternateAddress"
          country={this.props.Address.country}
          militaryAddressLabel={i18n.t('address.militaryAddress.meResidence')}
          onUpdate={this.update}
        />
        <Field
          title={i18n.t('history.residence.heading.dates')}
          titleSize="h4"
          help="history.residence.help.dates"
          scrollIntoView={this.props.scrollIntoView}
        >
          {/* eslint jsx-a11y/label-has-associated-control: 0 */}
          {/* eslint jsx-a11y/label-has-for: 0 */}
          <label className="info-label">
            {i18n.t('history.residence.label.dates')}
          </label>
          <DateRange
            name="Dates"
            {...this.props.Dates}
            label={i18n.t('history.residence.label.dates')}
            minDateEqualTo
            onUpdate={this.updateDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('history.residence.heading.role')}
          titleSize="h4"
          className={
            (this.props.Role || {}).value === 'Other' ? 'no-margin-bottom' : ''
          }
          scrollIntoView={this.props.scrollIntoView}
        >
          <RadioGroup
            className="role option-list option-list-vertical"
            required={this.props.required}
            onError={this.props.onError}
            selectedValue={(this.props.Role || {}).value}
          >
            <Radio
              name="role-owned"
              label={i18n.m('history.residence.label.role.owned')}
              value="Own"
              onUpdate={this.updateRole}
              onError={this.props.onError}
            />
            <Radio
              name="role-rented"
              label={i18n.m('history.residence.label.role.rented')}
              value="Rent"
              onUpdate={this.updateRole}
              onError={this.props.onError}
            />
            <Radio
              name="role-military"
              label={i18n.m('history.residence.label.role.military')}
              value="MilitaryHousing"
              onUpdate={this.updateRole}
              onError={this.props.onError}
            />
            <Radio
              name="role-other"
              label={i18n.m('history.residence.label.role.other')}
              value="Other"
              onUpdate={this.updateRole}
              onError={this.props.onError}
            />
          </RadioGroup>
        </Field>
        <Show when={this.props.Role && this.props.Role.value === 'Other'}>
          <Field
            title={i18n.t('history.residence.label.role.explanation')}
            titleSize="h4"
            adjustFor="text"
            scrollIntoView={this.props.scrollIntoView}
          >
            <Text
              name="RoleOther"
              {...this.props.RoleOther}
              className="other"
              maxlength="100"
              onUpdate={this.updateRoleOther}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>
        </Show>

        <Show when={withinThreeYears(from, to, dates.present)}>
          <div>
            <Field
              title={i18n.t('history.residence.heading.reference')}
              titleSize="h3"
              optional
              className="no-margin-bottom"
              scrollIntoView={this.props.scrollIntoView}
            >
              {i18n.m('history.residence.para.reference')}
            </Field>

            <div className="reference">
              <Field
                title={i18n.t('reference.heading.name')}
                titleSize="h4"
                optional
                filterErrors={Name.requiredErrorsOnly}
                scrollIntoView={this.props.scrollIntoView}
              >
                <Name
                  name="ReferenceName"
                  prefix="name"
                  className="reference-name"
                  {...this.props.ReferenceName}
                  scrollIntoView={this.props.scrollIntoView}
                  onUpdate={this.updateReferenceName}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.contact')}
                titleSize="h4"
                help="reference.help.contact"
                adjustFor="labels"
                shrink
                scrollIntoView={this.props.scrollIntoView}
              >
                <DateControl
                  name="ReferenceLastContact"
                  className="reference-last-contact"
                  {...this.props.ReferenceLastContact}
                  minDateEqualTo
                  onUpdate={this.updateReferenceLastContact}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.relationship')}
                titleSize="h4"
                comments
                commentsName="ReferenceRelationshipComments"
                commentsValue={this.props.ReferenceRelationshipComments}
                commentsAdd="reference.label.relationship.comments"
                onUpdate={this.updateReferenceRelationshipComments}
                adjustFor="labels"
                shrink
                scrollIntoView={this.props.scrollIntoView}
              >
                <label>{i18n.t('reference.label.relationship.title')}</label>
                <CheckboxGroup
                  className="relationship option-list eapp-extend-labels option-list-vertical"
                  required={this.props.required}
                  onError={this.props.onError}
                  selectedValues={
                    (this.props.ReferenceRelationship || {}).values || []
                  }
                >
                  <Checkbox
                    name="relationship-neighbor"
                    className="reference-relationship-neighbor"
                    label={i18n.t('reference.label.relationship.neighbor')}
                    value="Neighbor"
                    onUpdate={this.updateReferenceRelationship}
                  />
                  <Checkbox
                    name="relationship-friend"
                    className="reference-relationship-friend"
                    label={i18n.t('reference.label.relationship.friend')}
                    value="Friend"
                    onUpdate={this.updateReferenceRelationship}
                  />
                  <Checkbox
                    name="relationship-landlord"
                    className="reference-relationship-landlord"
                    label={i18n.t('reference.label.relationship.landlord')}
                    value="Landlord"
                    onUpdate={this.updateReferenceRelationship}
                  />
                  <Checkbox
                    name="relationship-business"
                    className="reference-relationship-business"
                    label={i18n.t('reference.label.relationship.business')}
                    value="Business"
                    onUpdate={this.updateReferenceRelationship}
                  />
                  <Checkbox
                    name="relationship-other"
                    className="reference-relationship-other"
                    label={i18n.t('reference.label.relationship.other')}
                    value="Other"
                    onUpdate={this.updateReferenceRelationship}
                  />
                </CheckboxGroup>
                <Show
                  when={(
                    (this.props.ReferenceRelationship || {}).values || []
                  ).some(x => x === 'Other')}
                >
                  <Text
                    name="ReferenceRelationshipOther"
                    label={i18n.t('reference.label.relationship.explanation')}
                    maxlength="100"
                    className="relationship-other"
                    {...this.props.ReferenceRelationshipOther}
                    onUpdate={this.updateReferenceRelationshipOther}
                    onError={this.props.onError}
                    required={this.props.required}
                  />
                </Show>
              </Field>

              <Field
                title={i18n.t('reference.heading.correspondence')}
                titleSize="h3"
                optional
                className="no-margin-bottom"
                scrollIntoView={this.props.scrollIntoView}
              >
                {i18n.m('reference.para.correspondence')}
              </Field>

              <Field
                title={i18n.t('reference.heading.phone.evening')}
                titleSize="h4"
                className="override-required"
                help="reference.help.phone"
                adjustFor="telephone"
                scrollIntoView={this.props.scrollIntoView}
              >
                <Telephone
                  name="ReferencePhoneEvening"
                  className="reference-phone-evening"
                  {...this.props.ReferencePhoneEvening}
                  onUpdate={this.updateReferencePhoneEvening}
                  onError={this.props.onError}
                  required={this.props.required}
                  showTimeOfDay={false}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.phone.day')}
                titleSize="h4"
                className="override-required"
                help="reference.help.phone"
                adjustFor="telephone"
                scrollIntoView={this.props.scrollIntoView}
              >
                <Telephone
                  name="ReferencePhoneDay"
                  className="reference-phone-day"
                  {...this.props.ReferencePhoneDay}
                  onUpdate={this.updateReferencePhoneDay}
                  onError={this.props.onError}
                  required={this.props.required}
                  showTimeOfDay={false}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.phone.mobile')}
                titleSize="h4"
                className="override-required"
                help="reference.help.phone"
                adjustFor="telephone"
                scrollIntoView={this.props.scrollIntoView}
              >
                <Telephone
                  name="ReferencePhoneMobile"
                  className="reference-phone-mobile"
                  {...this.props.ReferencePhoneMobile}
                  onUpdate={this.updateReferencePhoneMobile}
                  onError={this.props.onError}
                  required={this.props.required}
                  showTimeOfDay={false}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.email')}
                titleSize="h4"
                help="reference.help.email"
                adjustFor="label"
                scrollIntoView={this.props.scrollIntoView}
              >
                <NotApplicable
                  name="ReferenceEmailNotApplicable"
                  {...this.props.ReferenceEmailNotApplicable}
                  label={i18n.t('reference.label.idk')}
                  or={i18n.m('reference.para.or')}
                  onUpdate={this.updateReferenceEmailNotApplicable}
                  onError={this.props.onError}
                >
                  <Email
                    name="ReferenceEmail"
                    {...this.props.ReferenceEmail}
                    className="reference-email"
                    label={i18n.t('reference.label.email')}
                    onUpdate={this.updateReferenceEmail}
                    onError={this.props.onError}
                  />
                </NotApplicable>
              </Field>

              <Field
                title={i18n.t('reference.heading.address')}
                titleSize="h4"
                optional
                help="reference.help.address"
                adjustFor="address"
                scrollIntoView={this.props.scrollIntoView}
              >
                <p>{i18n.t('reference.para.address')}</p>
                <Location
                  name="ReferenceAddress"
                  className="reference-address"
                  {...this.props.ReferenceAddress}
                  label={i18n.t('reference.label.address')}
                  layout={Location.ADDRESS}
                  geocode
                  addressBooks={this.props.addressBooks}
                  addressBook="Reference"
                  showPostOffice
                  dispatch={this.props.dispatch}
                  onUpdate={this.updateReferenceAddress}
                  onError={this.props.onError}
                />
              </Field>
              <ConnectedAlternateAddress
                belongingTo="ReferenceAlternateAddress"
                address={this.props.ReferenceAlternateAddress}
                country={this.props.ReferenceAddress.country}
                militaryAddressLabel={i18n.t(
                  'address.militaryAddress.residenceVerifier'
                )}
                onUpdate={this.update}
              />
            </div>
          </div>
        </Show>
      </div>
    )
  }
}

ResidenceItem.defaultProps = {
  Dates: {},
  Address: {},
  Comments: {},
  Role: {},
  RoleOther: {},
  ReferenceName: {},
  ReferenceLastContact: {},
  ReferenceRelationshipComments: {},
  ReferenceRelationship: {},
  ReferenceRelationshipOther: {},
  ReferencePhoneEvening: {},
  ReferencePhoneDay: {},
  ReferencePhoneMobile: {},
  ReferenceEmailNotApplicable: { applicable: true },
  ReferenceEmail: {},
  ReferenceAddress: {},
  addressBooks: {},
  dispatch: () => {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
