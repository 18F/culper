import name from 'models/shared/name'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'
import address from 'models/shared/locations/address'

const foreignBusinessSponsorship = {
  Name: { presence: true, model: { validator: name } },
  Birthdate: (value, attributes) => {
    const { BirthdateNotApplicable } = attributes
    if (BirthdateNotApplicable && BirthdateNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, date: true }
  },
  Birthplace: { presence: true, location: { validator: usCityStateZipInternationalCity } },
  Address: { presence: true, location: { validator: address } },
  Citizenship: {
    presence: true,
    hasValue: { validator: { length: { minimum: 1 } } },
  },
  Dates: { presence: true, daterange: true },
  Residence: { presence: true, location: { validator: address } },
  Organization: (value, attributes) => {
    const { OrganizationNotApplicable } = attributes
    if (OrganizationNotApplicable && OrganizationNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, hasValue: true }
  },
  OrganizationAddress: (value, attributes) => {
    const { OrganizationAddressNotApplicable } = attributes
    if (OrganizationAddressNotApplicable
      && OrganizationAddressNotApplicable.applicable === false) {
      return {}
    }

    return { presence: true, location: { validator: address } }
  },
  Stay: { presence: true, hasValue: true },
  Sponsorship: { presence: true, hasValue: true },
}

export default foreignBusinessSponsorship
