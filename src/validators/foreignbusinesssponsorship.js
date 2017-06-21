import NameValidator from './name'
import AddressValidator from './address'
import LocationValidator from './location'
import DateRangeValidator from './daterange'
import BirthPlaceValidator from './birthplace'
import { validGenericTextfield, validDateField, validNotApplicable, BranchCollection } from './helpers'

export default class ForeignBusinessSponsorshipValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignSponsorship = props.HasForeignSponsorship
    this.list = props.List || []
    this.listBranch = props.ListBranch
  }

  validList () {
    if (this.hasForeignSponsorship === 'No') {
      return true
    }

    if (this.hasForeignSponsorship === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new SponsorshipValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class SponsorshipValidator {
  constructor (state = {}, props = {}) {
    this.name = props.Name
    this.birthdate = props.Birthdate
    this.birthdateNotApplicable = props.BirthdateNotApplicable
    this.birthplace = props.Birthplace
    this.address = props.Address
    this.citizenship = props.Citizenship
    this.organization = props.Organization
    this.organizationNotApplicable = props.OrganizationNotApplicable
    this.organizationAddress = props.OrganizationAddress
    this.organizationAddressNotApplicable = props.OrganizationAddressNotApplicable
    this.dates = props.Dates
    this.residence = props.Residence
    this.stay = props.Stay
    this.sponsorship = props.Sponsorship
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validBirthdate () {
    return validNotApplicable(this.birtdateNotApplicable, () => {
      return !!this.birthdate && validDateField(this.birthdate)
    })
  }

  validBirthplace () {
    return !!this.birthplace && new BirthPlaceValidator(this.birthplace, null).isValid()
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
    return !!this.residence && new AddressValidator(this.residence, null).isValid()
  }

  validOrganization () {
    return validNotApplicable(this.organizationNotApplicable, () => {
      return !!this.organization && validGenericTextfield(this.organization)
    })
  }

  validOrganizationAddress () {
    return validNotApplicable(this.organizationAddressNotApplicable, () => {
      return !!this.organizationAddress && new AddressValidator(this.organizationAddress, null).isValid()
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
