import name from 'models/shared/name'
import birthplaceWithoutCounty from 'models/shared/locations/birthplaceWithoutCounty'
import foreignBornDocument from 'models/foreignBornDocument'

import { countryString } from 'validators/location'
import { DEFAULT_LATEST, OTHER } from 'constants/dateLimits'
import { sortDateObjects } from 'helpers/date'

export const otherName = {
  OtherName: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: true },
  DatesUsed: { presence: true, daterange: true },
}

const cohabitant = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  Birthdate: {
    presence: true,
    date: OTHER,
  },
  BirthPlace: {
    presence: true,
    location: { validator: birthplaceWithoutCounty },
  },
  SSN: {
    presence: true,
    ssn: true,
  },
  Citizenship: {
    presence: true,
    country: true,
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
  CohabitationBegan: (value, attributes, attributeName, options) => {
    const { Birthdate } = attributes
    const { applicantBirthdate } = options

    const sortedDates = sortDateObjects([Birthdate, applicantBirthdate])

    const earliestDate = sortedDates.length
      ? sortedDates[sortedDates.length - 1]
      : null

    return {
      presence: true,
      date: {
        earliest: earliestDate,
        latest: DEFAULT_LATEST,
      },
    }
  },
  ForeignBornDocument: (value, attributes = {}) => {
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
}

export default cohabitant
