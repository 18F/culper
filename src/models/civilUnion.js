import name from 'models/shared/name'
import phone from 'models/shared/phone'
import birthplace from 'models/shared/locations/birthplace'
import address from 'models/shared/locations/address'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'
import foreignBornDocument from 'models/foreignBornDocument'
import { hasYesOrNo } from 'models/validate'

import { countryString } from 'validators/location'
import { DEFAULT_LATEST } from 'constants/dateLimits'

export const otherName = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: true },
  // TODO from must be >= person's DOB, to <= NOW
  DatesUsed: { presence: true, daterange: true },
}

// TODO add email, emailnotapplicable?
// TODO add alternate address
const civilUnion = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  // TODO >= 200 years ago, <= NOW
  Birthdate: {
    presence: true,
    date: true,
  },
  BirthPlace: {
    presence: true,
    location: { validator: birthplace },
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
  Location: {
    presence: true,
    location: { validator: birthplace },
  },
  // TODO country
  Citizenship: {
    presence: true,
    country: true,
  },
  // TODO date >= DOB and person's DOB, <= NOW
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
  // TODO >= date entered civil union, <= NOW
  DateSeparated: (value, attributes) => {
    if (attributes.Separated
      && attributes.Separated.value === 'Yes') {
      return {
        presence: true,
        date: true,
      }
    }

    return {}
  },
}

export default civilUnion
