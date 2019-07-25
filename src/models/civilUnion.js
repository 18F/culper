import name from 'models/shared/name'
import phone from 'models/shared/phone'
import birthplace from 'models/shared/locations/birthplace'
import address from 'models/shared/locations/address'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'
import physicalAddress from 'models/shared/physicalAddress'
import foreignBornDocument from 'models/foreignBornDocument'
import { hasYesOrNo } from 'models/validate'
import { DEFAULT_LATEST, OTHER } from 'constants/dateLimits'
import { countryString } from 'validators/location'
import { isInternational, isPO } from 'helpers/location'

export const otherName = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: true },
  DatesUsed: { presence: true, daterange: true },
}

const civilUnion = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  Birthdate: {
    presence: true,
    date: { ...OTHER },
  },
  BirthPlace: {
    presence: true,
    location: { validator: birthplace },
  },
  Email: (value, attributes) => {
    if (attributes.EmailNotApplicable && attributes.EmailNotApplicable.applicable === false) {
      return {}
    }

    return {
      presence: true,
      hasValue: { validator: { email: true } },
    }
  },
  Telephone: {
    presence: true,
    model: { validator: phone },
  },
  SSN: {
    presence: true,
    ssn: true,
  },
  Separated: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  Address: (value, attributes) => {
    // UseCurrentAddress applicable is the opposite of all other NotApplicable patterns
    if (attributes.UseCurrentAddress
      && attributes.UseCurrentAddress.applicable === true) return {}

    return { presence: true, location: { validator: address } }
  },
  AlternateAddress: (value, attributes) => {
    if (attributes.Address && isInternational(attributes.Address)) {
      return {
        presence: true,
        model: { validator: physicalAddress, militaryAddress: true },
      }
    }

    if (attributes.Address && isPO(attributes.Address)) {
      return {
        presence: true,
        model: { validator: physicalAddress, militaryAddress: false },
      }
    }

    return {}
  },
  Location: {
    presence: true,
    location: { validator: birthplace },
  },
  Citizenship: {
    presence: true,
    country: true,
  },
  EnteredCivilUnion: {
    presence: true, date: true,
  },
  Divorced: {
    presence: true,
    hasValue: true,
  },
  OtherNames: (value, attributes) => {
    const dateLimits = { latest: DEFAULT_LATEST }
    if (attributes.Birthdate) dateLimits.earliest = attributes.Birthdate

    return {
      presence: true,
      branchCollection: {
        validator: otherName,
        ...dateLimits,
      },
    }
  },
  ForeignBornDocument: (value, attributes) => {
    if (attributes.BirthPlace
      && attributes.BirthPlace.country
      && countryString(attributes.BirthPlace.country) !== 'United States') {
      return {
        presence: true,
        model: { validator: foreignBornDocument },
      }
    }

    return {}
  },
  AddressSeparated: (value, attributes) => {
    if (attributes.AddressSeparatedNotApplicable
      && attributes.AddressSeparatedNotApplicable.applicable === false) {
      return {}
    }

    if (attributes.Separated
      && attributes.Separated.value === 'Yes') {
      return {
        presence: true,
        location: { validator: usCityStateZipInternationalCity },
      }
    }

    return {}
  },
  DateSeparated: (value, attributes) => {
    if (attributes.Separated && attributes.Separated.value === 'Yes') {
      const dateLimits = { latest: DEFAULT_LATEST }
      if (attributes.EnteredCivilUnion) {
        dateLimits.earliest = attributes.EnteredCivilUnion
      }

      return { presence: true, date: dateLimits }
    }

    return {}
  },
}

export default civilUnion
