import NameValidator from './name'
import LocationValidator from './location'
import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield, validDateField, validNotApplicable } from './helpers'

export default class ForeignBusinessSponsorshipValidator {
  constructor (data = {}) {
    this.hasForeignSponsorship = (data.HasForeignSponsorship || {}).value
    this.list = data.List || {}
  }

  validList () {
    if (this.hasForeignSponsorship === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new SponsorshipValidator(item).isValid()
    })
  }

  isValid () {
    return this.validList()
  }
}

export class SponsorshipValidator {
  constructor (data = {}) {
    this.name = data.Name
    this.birthdate = data.Birthdate
    this.birthdateNotApplicable = data.BirthdateNotApplicable
    this.birthplace = data.Birthplace
    this.address = data.Address
    this.citizenship = data.Citizenship
    this.organization = data.Organization
    this.organizationNotApplicable = data.OrganizationNotApplicable
    this.organizationAddress = data.OrganizationAddress
    this.organizationAddressNotApplicable = data.OrganizationAddressNotApplicable
    this.dates = data.Dates
    this.residence = data.Residence
    this.stay = data.Stay
    this.sponsorship = data.Sponsorship
  }

  validName () {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validBirthdate () {
    return validNotApplicable(this.birthdateNotApplicable, () => {
      return !!this.birthdate && validDateField(this.birthdate)
    })
  }

  validBirthplace () {
    return !!this.birthplace && new LocationValidator(this.birthplace).isValid()
  }

  validAddress () {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validCitizenship () {
    return !!this.citizenship && !!this.citizenship.value && this.citizenship.value.length > 0
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validResidence () {
    return !!this.residence && new LocationValidator(this.residence).isValid()
  }

  validOrganization () {
    return validNotApplicable(this.organizationNotApplicable, () => {
      return !!this.organization && validGenericTextfield(this.organization)
    })
  }

  validOrganizationAddress () {
    return validNotApplicable(this.organizationAddressNotApplicable, () => {
      return !!this.organizationAddress && new LocationValidator(this.organizationAddress).isValid()
    })
  }

  validStay () {
    return !!this.stay && validGenericTextfield(this.stay)
  }

  validSponsorship () {
    return !!this.sponsorship && validGenericTextfield(this.sponsorship)
  }

  isValid () {
    return this.validName() &&
      this.validBirthdate() &&
      this.validBirthplace() &&
      this.validAddress() &&
      this.validCitizenship() &&
      this.validDates() &&
      this.validResidence() &&
      this.validOrganization() &&
      this.validOrganizationAddress() &&
      this.validStay() &&
      this.validSponsorship()
  }
}
