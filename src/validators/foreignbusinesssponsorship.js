import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessSponsorship from 'models/foreignBusinessSponsorship'

export const validateSponsorship = data => validateModel(data, foreignBusinessSponsorship)

export const validateForeignBusinessSponsorship = (data) => {
  const foreignBusinessSponsorshipModel = {
    HasForeignSponsorship: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignSponsorship && attributes.HasForeignSponsorship.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessSponsorship },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessSponsorshipModel)
}

export default class ForeignBusinessSponsorshipValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessSponsorship(this.data) === true
  }
}

export class SponsorshipValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignBusinessSponsorship.Name,
    }) === true
  }

  validBirthdate() {
    return validateModel(this.data, {
      Birthdate: foreignBusinessSponsorship.Birthdate,
    }) === true
  }

  validBirthplace() {
    return validateModel(this.data, {
      Birthplace: foreignBusinessSponsorship.Birthplace,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: foreignBusinessSponsorship.Address,
    }) === true
  }

  validCitizenship() {
    return validateModel(this.data, {
      Citizenship: foreignBusinessSponsorship.Citizenship,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: foreignBusinessSponsorship.Dates,
    }) === true
  }

  validResidence() {
    return validateModel(this.data, {
      Residence: foreignBusinessSponsorship.Residence,
    }) === true
  }

  validOrganization() {
    return validateModel(this.data, {
      Organization: foreignBusinessSponsorship.Organization,
    }) === true
  }

  validOrganizationAddress() {
    return validateModel(this.data, {
      OrganizationAddress: foreignBusinessSponsorship.OrganizationAddress,
    }) === true
  }

  validStay() {
    return validateModel(this.data, {
      Stay: foreignBusinessSponsorship.Stay,
    }) === true
  }

  validSponsorship() {
    return validateModel(this.data, {
      Sponsorship: foreignBusinessSponsorship.Sponsorship,
    }) === true
  }

  isValid() {
    return validateSponsorship(this.data) === true
  }
}
