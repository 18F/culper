import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  Field,
  Text,
  Textarea,
  Country,
  DateControl,
  Name,
  Location,
  DateRange,
  NotApplicable
} from '../../../Form'

export default class SponsorshipItem extends ValidationElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateBirthdateNotApplicable = this.updateBirthdateNotApplicable.bind(
      this
    )
    this.updateBirthdate = this.updateBirthdate.bind(this)
    this.updateBirthplace = this.updateBirthplace.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateCitizenship = this.updateCitizenship.bind(this)
    this.updateOrganizationNotApplicable = this.updateOrganizationNotApplicable.bind(
      this
    )
    this.updateOrganization = this.updateOrganization.bind(this)
    this.updateOrganizationAddressNotApplicable = this.updateOrganizationAddressNotApplicable.bind(
      this
    )
    this.updateOrganizationAddress = this.updateOrganizationAddress.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateResidence = this.updateResidence.bind(this)
    this.updateStay = this.updateStay.bind(this)
    this.updateSponsorship = this.updateSponsorship.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      BirthdateNotApplicable: this.props.BirthdateNotApplicable,
      Birthdate: this.props.Birthdate,
      Birthplace: this.props.Birthplace,
      Address: this.props.Address,
      Citizenship: this.props.Citizenship,
      OrganizationNotApplicable: this.props.OrganizationNotApplicable,
      Organization: this.props.Organization,
      Dates: this.props.Dates,
      Residence: this.props.Residence,
      Stay: this.props.Stay,
      Sponsorship: this.props.Sponsorship,
      OrganizationAddressNotApplicable: this.props
        .OrganizationAddressNotApplicable,
      OrganizationAddress: this.props.OrganizationAddress,
      ...queue
    })
  }

  updateName(values) {
    this.update({
      Name: values
    })
  }

  updateBirthdateNotApplicable(values) {
    this.update({
      BirthdateNotApplicable: values
    })
  }

  updateBirthdate(values) {
    this.update({
      Birthdate: values
    })
  }

  updateBirthplace(values) {
    this.update({
      Birthplace: values
    })
  }

  updateAddress(values) {
    this.update({
      Address: values
    })
  }

  updateCitizenship(values) {
    this.update({
      Citizenship: values
    })
  }

  updateOrganizationNotApplicable(values) {
    this.update({
      OrganizationNotApplicable: values
    })
  }

  updateOrganization(values) {
    this.update({
      Organization: values
    })
  }

  updateDates(values) {
    this.update({
      Dates: values
    })
  }

  updateResidence(values) {
    this.update({
      Residence: values
    })
  }

  updateStay(values) {
    this.update({
      Stay: values
    })
  }

  updateSponsorship(values) {
    this.update({
      Sponsorship: values
    })
  }

  updateOrganizationAddressNotApplicable(values) {
    this.update({
      OrganizationAddressNotApplicable: values
    })
  }

  updateOrganizationAddress(values) {
    this.update({
      OrganizationAddress: values
    })
  }

  render() {
    return (
      <div className="sponsorship-item">
        <Field
          title={i18n.t('foreign.business.sponsorship.heading.name')}
          optional={true}
          filterErrors={Name.requiredErrorsOnly}
          scrollIntoView={this.props.scrollIntoView}>
          <Name
            name="Name"
            {...this.props.Name}
            onUpdate={this.updateName}
            onError={this.props.onError}
            className="foreign-business-sponsorship-name"
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.birthdate')}
          help="foreign.business.sponsorship.help.birthdate"
          adjustFor="datecontrol"
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="BirthdateNotApplicable"
            label={i18n.t('foreign.business.sponsorship.label.idk')}
            or={i18n.m('foreign.business.sponsorship.para.or')}
            {...this.props.BirthdateNotApplicable}
            onUpdate={this.updateBirthdateNotApplicable}
            onError={this.props.onError}
            className="foreign-business-sponsorship-birthdate-na"
            required={this.props.required}>
            <DateControl
              name="Birthdate"
              {...this.props.Birthdate}
              relationship="Other"
              onUpdate={this.updateBirthdate}
              onError={this.props.onError}
              className="foreign-business-sponsorship-birthdate"
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.birthplace')}
          adjustFor="birthplace"
          validate={false}
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="Birthplace"
            {...this.props.Birthplace}
            onUpdate={this.updateBirthplace}
            onError={this.props.onError}
            layout={Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY}
            label={i18n.t('foreign.business.sponsorship.label.birthplace')}
            cityPlaceholder={i18n.t(
              'foreign.business.sponsorship.placeholder.city'
            )}
            countryPlaceholder={i18n.t(
              'foreign.business.sponsorship.placeholder.country'
            )}
            className="foreign-business-sponsorship-birthplace"
            addressBooks={this.props.addressBooks}
            addressBook="ForeignNational"
            dispatch={this.props.dispatch}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.address')}
          optional={true}
          help="foreign.business.sponsorship.help.address"
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="Address"
            {...this.props.Address}
            onUpdate={this.updateAddress}
            onError={this.props.onError}
            className="foreign-business-sponsorship-address"
            layout={Location.ADDRESS}
            geocode={true}
            showPostOffice={true}
            addressBooks={this.props.addressBooks}
            addressBook="ForeignNational"
            dispatch={this.props.dispatch}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.citizenship')}
          help="foreign.business.sponsorship.help.citizenship"
          adjustFor="country"
          scrollIntoView={this.props.scrollIntoView}>
          <Country
            name="Citizenship"
            {...this.props.Citizenship}
            onUpdate={this.updateCitizenship}
            onError={this.props.onError}
            className="foreign-business-sponsorship-citizenship"
            multiple={true}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.organization')}
          adjustFor="text"
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="OrganizationNotApplicable"
            {...this.props.OrganizationNotApplicable}
            onUpdate={this.updateOrganizationNotApplicable}
            onError={this.props.onError}
            or={i18n.m('foreign.business.sponsorship.para.or')}
            required={this.props.required}>
            <Text
              name="Organization"
              {...this.props.Organization}
              onUpdate={this.updateOrganization}
              onError={this.props.onError}
              className="foreign-business-sponsorship-organization"
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t(
            'foreign.business.sponsorship.heading.organizationaddress'
          )}
          optional={true}
          help="foreign.business.sponsorship.help.organizationaddress"
          adjustFor="address"
          scrollIntoView={this.props.scrollIntoView}>
          <NotApplicable
            name="OrganizationAddressNotApplicable"
            {...this.props.OrganizationAddressNotApplicable}
            onUpdate={this.updateOrganizationAddressNotApplicable}
            onError={this.props.onError}
            or={i18n.m('foreign.business.sponsorship.para.or')}
            required={this.props.required}>
            <Location
              name="OrganizationAddress"
              {...this.props.OrganizationAddress}
              onUpdate={this.updateOrganizationAddress}
              onError={this.props.onError}
              className="foreign-business-sponsorship-organizationaddress"
              layout={Location.ADDRESS}
              geocode={true}
              addressBooks={this.props.addressBooks}
              addressBook="Organization"
              dispatch={this.props.dispatch}
              required={this.props.required}
            />
          </NotApplicable>
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.dates')}
          help="foreign.business.sponsorship.help.dates"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}>
          <DateRange
            name="Dates"
            {...this.props.Dates}
            onUpdate={this.updateDates}
            minDate={(this.props.Birthdate || {}).date}
            minDateEqualTo={true}
            onError={this.props.onError}
            className="foreign-business-sponsorship-dates"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.residence')}
          optional={true}
          adjustFor="address no-buttons"
          scrollIntoView={this.props.scrollIntoView}>
          <Location
            name="Residence"
            {...this.props.Residence}
            onUpdate={this.updateResidence}
            onError={this.props.onError}
            className="foreign-business-sponsorship-residence"
            disableToggle={true}
            layout={Location.ADDRESS}
            geocode={true}
            addressBooks={this.props.addressBooks}
            addressBook="ForeignNational"
            dispatch={this.props.dispatch}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.stay')}
          adjustFor="textarea"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Stay"
            {...this.props.Stay}
            onUpdate={this.updateStay}
            onError={this.props.onError}
            className="foreign-business-sponsorship-stay"
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('foreign.business.sponsorship.heading.sponsorship')}
          adjustFor="textarea"
          scrollIntoView={this.props.scrollIntoView}>
          <Textarea
            name="Sponsorship"
            {...this.props.Sponsorship}
            onUpdate={this.updateSponsorship}
            onError={this.props.onError}
            className="foreign-business-sponsorship-sponsorship"
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

SponsorshipItem.defaultProps = {
  BirthdateNotApplicable: { applicable: true },
  OrganizationNotApplicable: { applicable: true },
  OrganizationAddressNotApplicable: { applicable: true },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
