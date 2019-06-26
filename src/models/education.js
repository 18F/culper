import address from 'models/shared/locations/address'
import name from 'models/shared/name'
import phone from 'models/shared/phone'
import email from 'models/shared/email'

import { today, dateWithinRange } from 'helpers/date'

/** Helpers */
const educationRequiresReference = (dates = {}) => {
  const { from, present } = dates
  const to = present ? today.toObject() : dates.to
  const educationTimeFrame = { years: 3 }

  return dateWithinRange(to, educationTimeFrame)
    || dateWithinRange(from, educationTimeFrame)
}

const diploma = {
  Diploma: { presence: true, hasValue: true },
  DiplomaOther: (value, attributes) => {
    if (attributes.Diploma && attributes.Diploma.value === 'Other') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  // TODO must be >= DOB, <= NOW
  Date: {
    presence: true,
    date: { requireDay: false },
  },
}

const education = {
  // TODO from must be >= DOB, to must be <= NOW
  Dates: {
    presence: true,
    daterange: true,
  },
  Address: {
    presence: true,
    location: { validator: address },
  },
  Name: {
    presence: true,
    hasValue: true,
  },
  Type: {
    presence: true,
    hasValue: true,
  },
  ReferenceName: (value, attributes = {}) => {
    const { Dates, ReferenceNameNotApplicable } = attributes
    if (!educationRequiresReference(Dates)) return {}

    if (ReferenceNameNotApplicable && !ReferenceNameNotApplicable.applicable) {
      return {}
    }

    return {
      presence: true,
      model: {
        validator: name,
        hideMiddleName: true,
      },
    }
  },
  ReferenceNameNotApplicable: {},
  ReferencePhone: (value, attributes = {}) => (
    educationRequiresReference(attributes.Dates)
      ? {
        presence: true,
        model: { validator: phone },
      }
      : {}
  ),
  ReferenceEmail: (value, attributes = {}) => {
    const { Dates, ReferenceEmailNotApplicable } = attributes
    if (!educationRequiresReference(Dates)) return {}

    if (ReferenceEmailNotApplicable && !ReferenceEmailNotApplicable.applicable) {
      return {}
    }

    return {
      presence: true,
      model: { validator: email },
    }
  },
  ReferenceEmailNotApplicable: {},
  ReferenceAddress: (value, attributes = {}) => (
    educationRequiresReference(attributes.Dates)
      ? {
        presence: true,
        location: { validator: address },
      }
      : {}
  ),
  Diplomas: {
    presence: true,
    branchCollection: {
      validator: diploma,
    },
  },
}

export default education
