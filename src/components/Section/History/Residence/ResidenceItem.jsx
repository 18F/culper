import React from 'react'
import { i18n } from '../../../../config'
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
  Svg,
  Telephone,
  NotApplicable,
  Email
} from '../../../Form'
import { today, daysAgo } from '../dateranges'
import { buildDate } from '../../../../validators/helpers'

// We need to determine how far back 3 years ago was
const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to, present) => {
  return (
    present || (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
  )
}

/**
 * Residence item in a collection
 *
 * This was broken apart so it could manage minor local state in determining
 * when particular portions of this should be rendered.
 */
export default class ResidenceItem extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateReferenceName = this.updateReferenceName.bind(this)
    this.updateReferenceLastContact = this.updateReferenceLastContact.bind(this)
    this.updateReferenceRelationshipComments = this.updateReferenceRelationshipComments.bind(
      this
    )
    this.updateReferenceRelationship = this.updateReferenceRelationship.bind(
      this
    )
    this.updateReferenceRelationshipOther = this.updateReferenceRelationshipOther.bind(
      this
    )
    this.updateReferencePhoneEvening = this.updateReferencePhoneEvening.bind(
      this
    )
    this.updateReferencePhoneDay = this.updateReferencePhoneDay.bind(this)
    this.updateReferencePhoneMobile = this.updateReferencePhoneMobile.bind(this)
    this.updateReferenceEmailNotApplicable = this.updateReferenceEmailNotApplicable.bind(
      this
    )
    this.updateReferenceEmail = this.updateReferenceEmail.bind(this)
    this.updateReferenceAddress = this.updateReferenceAddress.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateRole = this.updateRole.bind(this)
    this.updateRoleOther = this.updateRoleOther.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  update(queue) {
    this.props.onUpdate({
      name: this.props.name,
      Dates: this.props.Dates,
      Address: this.props.Address,
      Comments: this.props.Comments,
      Role: this.props.Role,
      RoleOther: this.props.RoleOther,
      ReferenceName: this.props.ReferenceName,
      ReferenceLastContact: this.props.ReferenceLastContact,
      ReferenceRelationshipComments: this.props.ReferenceRelationshipComments,
      ReferenceRelationship: this.props.ReferenceRelationship,
      ReferenceRelationshipOther: this.props.ReferenceRelationshipOther,
      ReferencePhoneEvening: this.props.ReferencePhoneEvening,
      ReferencePhoneDay: this.props.ReferencePhoneDay,
      ReferencePhoneMobile: this.props.ReferencePhoneMobile,
      ReferenceEmailNotApplicable: this.props.ReferenceEmailNotApplicable,
      ReferenceEmail: this.props.ReferenceEmail,
      ReferenceAddress: this.props.ReferenceAddress,
      ...queue
    })
  }

  updateReferenceName(values) {
    this.update({
      ReferenceName: values
    })
  }

  updateReferenceLastContact(values) {
    this.update({
      ReferenceLastContact: values
    })
  }

  updateReferenceRelationshipComments(values) {
    this.update({
      ReferenceRelationshipComments: values
    })
  }

  updateReferenceRelationship(values) {
    let selected = [...((this.props.ReferenceRelationship || {}).values || [])]

    if (values.checked) {
      // Add the new relationship
      selected.push(values.value)
    } else {
      if (selected.includes(values.value)) {
        // Remove the relationship if it was previously selected
        selected.splice(selected.indexOf(values.value), 1)
      }
    }

    this.update({
      ReferenceRelationship: {
        values: selected
      }
    })
  }

  updateReferenceRelationshipOther(values) {
    this.update({
      ReferenceRelationshipOther: values
    })
  }

  updateReferencePhoneEvening(values) {
    this.update({
      ReferencePhoneEvening: values
    })
  }

  updateReferencePhoneDay(values) {
    this.update({
      ReferencePhoneDay: values
    })
  }

  updateReferencePhoneMobile(values) {
    this.update({
      ReferencePhoneMobile: values
    })
  }

  updateReferenceEmailNotApplicable(values) {
    this.update({
      ReferenceEmailNotApplicable: values,
      ReferenceEmail: values.applicable ? this.props.ReferenceEmail : {}
    })
  }

  updateReferenceEmail(values) {
    this.update({
      ReferenceEmail: values
    })
  }

  updateReferenceAddress(values) {
    this.update({
      ReferenceAddress: values
    })
  }

  updateComments(values) {
    this.update({
      Comments: values
    })
  }

  updateAddress(values) {
    this.update({
      Address: values
    })
  }

  updateDates(values) {
    const dates = this.props.Dates || {}
    const from = dates.from
    const to = dates.to
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
      ReferenceAddress: zeroReference ? {} : this.props.ReferenceAddress
    })
  }

  updateRole(values) {
    this.update({
      Role: values
    })
  }

  updateRoleOther(values) {
    this.update({
      RoleOther: values
    })
  }

  render() {
    // Certain elements are present if the date range of the residency was
    // within the last 3 years.
    const dates = this.props.Dates || {}
    const from = buildDate(dates.from)
    const to = buildDate(dates.to)

    return (
      <div className="residence">
        <Field
          title={i18n.t('history.residence.heading.address')}
          optional={true}
          help="history.residence.help.address"
          comments={false}
          commentsName="Comments"
          commentsValue={this.props.Comments}
          commentsAdd="history.residence.label.comments"
          onUpdate={this.updateComments}
          onError={this.props.onError}
          adjustFor="address"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="Address"
            {...this.props.Address}
            label={i18n.t('history.residence.label.address')}
            layout={Location.ADDRESS}
            geocode={true}
            addressBook="Residence"
            addressBooks={this.props.addressBooks}
            showPostOffice={true}
            dispatch={this.props.dispatch}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('history.residence.heading.dates')}
          help="history.residence.help.dates"
          scrollIntoView={this.props.scrollIntoView}>
          <label className="info-label">
            {i18n.t('history.residence.label.dates')}
          </label>
          <DateRange
            name="Dates"
            {...this.props.Dates}
            label={i18n.t('history.residence.label.dates')}
            onUpdate={this.updateDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('history.residence.heading.role')}
          className={
            (this.props.Role || {}).value === 'Other' ? 'no-margin-bottom' : ''
          }
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            className="role option-list"
            required={this.props.required}
            onError={this.props.onError}
            selectedValue={(this.props.Role || {}).value}>
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
        <Show
          when={
            (this.props.Role || {}).value &&
            !['Own', 'Rent', 'Military'].includes((this.props.Role || {}).value)
          }>
          <Field
            title={i18n.t('history.residence.label.role.explanation')}
            titleSize="label"
            adjustFor="text"
            scrollIntoView={this.props.scrollIntoView}>
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
              titleSize="h2"
              optional={true}
              className="no-margin-bottom"
              scrollIntoView={this.props.scrollIntoView}>
              {i18n.m('history.residence.para.reference')}
            </Field>

            <div className="reference">
              <Field
                title={i18n.t('reference.heading.name')}
                titleSize="h3"
                optional={true}
                filterErrors={Name.requiredErrorsOnly}
                scrollIntoView={this.props.scrollIntoView}>
                <Name
                  name="ReferenceName"
                  prefix={'name'}
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
                help={'reference.help.contact'}
                adjustFor="labels"
                shrink={true}
                scrollIntoView={this.props.scrollIntoView}>
                <DateControl
                  name="ReferenceLastContact"
                  className="reference-last-contact"
                  {...this.props.ReferenceLastContact}
                  onUpdate={this.updateReferenceLastContact}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.relationship')}
                comments={true}
                commentsName="ReferenceRelationshipComments"
                commentsValue={this.props.ReferenceRelationshipComments}
                commentsAdd={'reference.label.relationship.comments'}
                onUpdate={this.updateReferenceRelationshipComments}
                adjustFor="labels"
                shrink={true}
                scrollIntoView={this.props.scrollIntoView}>
                <label>{i18n.t('reference.label.relationship.title')}</label>
                <CheckboxGroup
                  className="relationship option-list eapp-extend-labels"
                  required={this.props.required}
                  onError={this.props.onError}
                  selectedValues={
                    (this.props.ReferenceRelationship || {}).values || []
                  }>
                  <Checkbox
                    name="relationship-neighbor"
                    className="reference-relationship-neighbor"
                    label={i18n.t('reference.label.relationship.neighbor')}
                    value="Neighbor"
                    onUpdate={this.updateReferenceRelationship}>
                    <div className="relationship-icon neighbor">
                      <Svg src="/img/neighbor-icon.svg" />
                    </div>
                  </Checkbox>
                  <Checkbox
                    name="relationship-friend"
                    className="reference-relationship-friend"
                    label={i18n.t('reference.label.relationship.friend')}
                    value="Friend"
                    onUpdate={this.updateReferenceRelationship}>
                    <div className="relationship-icon friend">
                      <Svg src="/img/friend-icon.svg" />
                    </div>
                  </Checkbox>
                  <Checkbox
                    name="relationship-landlord"
                    className="reference-relationship-landlord"
                    label={i18n.t('reference.label.relationship.landlord')}
                    value="Landlord"
                    onUpdate={this.updateReferenceRelationship}>
                    <div className="relationship-icon landlord">
                      <Svg src="/img/landlord-icon.svg" />
                    </div>
                  </Checkbox>
                  <Checkbox
                    name="relationship-business"
                    className="reference-relationship-business"
                    label={i18n.t('reference.label.relationship.business')}
                    value="Business"
                    onUpdate={this.updateReferenceRelationship}>
                    <div className="relationship-icon business">
                      <Svg src="/img/business-associate-icon.svg" />
                    </div>
                  </Checkbox>
                  <Checkbox
                    name="relationship-other"
                    className="reference-relationship-other"
                    label={i18n.t('reference.label.relationship.other')}
                    value="Other"
                    onUpdate={this.updateReferenceRelationship}>
                    <div className="relationship-icon other">
                      <Svg src="/img/other-icon.svg" />
                    </div>
                  </Checkbox>
                </CheckboxGroup>
                <Show
                  when={(
                    (this.props.ReferenceRelationship || {}).values || []
                  ).some(x => {
                    return x === 'Other'
                  })}>
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
                titleSize="h2"
                optional={true}
                className="no-margin-bottom"
                scrollIntoView={this.props.scrollIntoView}>
                {i18n.m('reference.para.correspondence')}
              </Field>

              <Field
                title={i18n.t('reference.heading.phone.evening')}
                className="override-required"
                help={'reference.help.phone'}
                adjustFor="telephone"
                scrollIntoView={this.props.scrollIntoView}>
                <Telephone
                  name="ReferencePhoneEvening"
                  className="reference-phone-evening"
                  {...this.props.ReferencePhoneEvening}
                  onUpdate={this.updateReferencePhoneEvening}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.phone.day')}
                className="override-required"
                help={'reference.help.phone'}
                adjustFor="telephone"
                scrollIntoView={this.props.scrollIntoView}>
                <Telephone
                  name="ReferencePhoneDay"
                  className="reference-phone-day"
                  {...this.props.ReferencePhoneDay}
                  onUpdate={this.updateReferencePhoneDay}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.phone.mobile')}
                className="override-required"
                help={'reference.help.phone'}
                adjustFor="telephone"
                scrollIntoView={this.props.scrollIntoView}>
                <Telephone
                  name="ReferencePhoneMobile"
                  className="reference-phone-mobile"
                  {...this.props.ReferencePhoneMobile}
                  onUpdate={this.updateReferencePhoneMobile}
                  onError={this.props.onError}
                  required={this.props.required}
                />
              </Field>

              <Field
                title={i18n.t('reference.heading.email')}
                help={'reference.help.email'}
                adjustFor="label"
                scrollIntoView={this.props.scrollIntoView}>
                <NotApplicable
                  name="ReferenceEmailNotApplicable"
                  {...this.props.ReferenceEmailNotApplicable}
                  label={i18n.t('reference.label.idk')}
                  or={i18n.m('reference.para.or')}
                  onUpdate={this.updateReferenceEmailNotApplicable}
                  onError={this.props.onError}>
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
                optional={true}
                help={'reference.help.address'}
                adjustFor="address"
                scrollIntoView={this.props.scrollIntoView}>
                <p>{i18n.t('reference.para.address')}</p>
                <Location
                  name="ReferenceAddress"
                  className="reference-address"
                  {...this.props.ReferenceAddress}
                  label={i18n.t('reference.label.address')}
                  layout={Location.ADDRESS}
                  geocode={true}
                  addressBooks={this.props.addressBooks}
                  addressBook="Reference"
                  showPostOffice={true}
                  dispatch={this.props.dispatch}
                  onUpdate={this.updateReferenceAddress}
                  onError={this.props.onError}
                />
              </Field>
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
  ReferenceEmailNotApplicable: {},
  ReferenceEmail: {},
  ReferenceAddress: {},
  addressBooks: {},
  dispatch: action => {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
