import name from 'models/shared/name'
import phone from 'models/shared/phone'
import birthplace from 'models/shared/locations/birthplace'
import address from 'models/shared/locations/address'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'
import foreignBornDocument from 'models/foreignBornDocument'
import { hasYesOrNo } from 'models/validate'

import { countryString } from 'validators/location'

const otherName = {
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
  Address: { location: { validator: address } },
  Location: {
    presence: true,
    location: { validator: birthplace },
  },
  Citizenship: {
    presence: true,
    hasValue: { validator: { length: { minimum: 1 } } },
  },
  Divorced: {
    presence: true,
    hasValue: true,
  },
  OtherNames: {
    presence: true,
    branchCollection: {
      validator: otherName,
    },
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
