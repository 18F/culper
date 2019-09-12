import name from 'models/shared/name'
import cityCountry from 'models/shared/locations/cityCountry'
import address from 'models/shared/locations/address'
import physicalAddress from 'models/shared/physicalAddress'

import { OTHER, DEFAULT_LATEST } from 'constants/dateLimits'
import { sortDateObjects } from 'helpers/date'

const contactMethodOptions = [
  'In person',
  'Telephone',
  'Electronic',
  'Written',
  'Other',
]

const frequencyOptions = [
  'Daily',
  'Weekly',
  'Monthly',
  'Quarterly',
  'Annually',
  'Other',
]

const relationshipOptions = [
  'Professional',
  'Personal',
  'Obligation',
  'Other',
]

const foreignContact = {
  Name: (value, attributes) => {
    const { NameNotApplicable } = attributes
    if (NameNotApplicable && NameNotApplicable.applicable === false) return {}

    return {
      presence: true,
      model: { validator: name },
    }
  },
  NameExplanation: (value, attributes) => {
    const { NameNotApplicable } = attributes
    if (!NameNotApplicable || NameNotApplicable.applicable) return {}

    return {
      presence: true,
      hasValue: true,
    }
  },
  FirstContact: (value, attributes, attributeName, options) => {
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
  LastContact: (value, attributes) => {
    const dateLimits = { latest: DEFAULT_LATEST }
    if (attributes.FirstContact) dateLimits.earliest = attributes.FirstContact
    return {
      presence: true,
      date: dateLimits,
    }
  },
  Methods: {
    presence: true,
    array: {
      length: { minimum: 1 },
      validator: { inclusion: contactMethodOptions },
    },
  },
  MethodsExplanation: (value, attributes) => {
    const { Methods } = attributes
    if (Methods && Methods.values && Methods.values.includes('Other')) {
      return { presence: true, hasValue: true }
    }

    return {}
  },
  Frequency: {
    presence: true,
    hasValue: {
      validator: {
        inclusion: frequencyOptions,
      },
    },
  },
  FrequencyExplanation: (value, attributes) => {
    const { Frequency } = attributes
    if (Frequency && Frequency.value === 'Other') {
      return { presence: true, hasValue: true }
    }

    return {}
  },
  Relationship: {
    presence: true,
    array: {
      length: { minimum: 1 },
      validator: { inclusion: relationshipOptions },
    },
  },
  RelationshipExplanation: (value, attributes) => {
    const { Relationship } = attributes
    if (Relationship && Relationship.values
      && (Relationship.values.includes('Other')
        || Relationship.values.includes('Obligation'))) {
      return { presence: true, hasValue: true }
    }

    return {}
  },
  Aliases: {
    presence: true,
    branchCollection: {
      validator: {
        Alias: {
          model: { validator: name },
        },
      },
    },
  },
  Citizenship: { presence: true, country: true },
  Birthdate: (value, attributes) => {
    const { BirthdateNotApplicable } = attributes
    if (BirthdateNotApplicable && BirthdateNotApplicable.applicable === false) return {}
    return {
      presence: true,
      date: OTHER,
    }
  },
  Birthplace: (value, attributes) => {
    const { BirthplaceNotApplicable } = attributes
    if (BirthplaceNotApplicable && BirthplaceNotApplicable.applicable === false) return {}
    return {
      presence: true,
      location: {
        validator: cityCountry,
      },
    }
  },
  Address: (value, attributes) => {
    const { AddressNotApplicable } = attributes
    if (AddressNotApplicable && AddressNotApplicable.applicable === false) return {}
    return {
      presence: true,
      location: {
        validator: address,
      },
    }
  },
  AlternateAddress: {
    presence: true,
    model: {
      validator: physicalAddress,
      militaryAddress: true,
      hasTelephone: false,
    },
  },
  Employer: (value, attributes) => {
    const { EmployerNotApplicable } = attributes
    if (EmployerNotApplicable && EmployerNotApplicable.applicable === false) return {}
    return {
      presence: true,
      hasValue: true,
    }
  },
  EmployerAddress: (value, attributes) => {
    const { EmployerAddressNotApplicable } = attributes
    if (EmployerAddressNotApplicable && EmployerAddressNotApplicable.applicable === false) return {}
    return {
      presence: true,
      location: {
        validator: address,
      },
    }
  },
  HasAffiliations: {
    presence: true,
    hasValue: {
      validator: {
        inclusion: ['Yes', 'No', "I don't know"],
      },
    },
  },
  Affiliations: (value, attributes) => {
    const { HasAffiliations } = attributes
    if (HasAffiliations && HasAffiliations.value === 'Yes') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
}

export default foreignContact
