import name from 'models/shared/name'
import cityCountry from 'models/shared/locations/cityCountry'
import address from 'models/shared/locations/address'

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
  // TODO must be >= DOB and persons DOB, <= NOW
  FirstContact: {
    presence: true,
    date: true,
  },
  // TODO must be >= first contact, <= NOW
  LastContact: {
    presence: true,
    date: true,
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
  // TODO country
  Citizenship: {
    presence: true,
    hasValue: {
      validator: { length: { minimum: 1 } },
    },
  },
  // TODO must be >= 200 years ago, <= NOW
  Birthdate: (value, attributes) => {
    const { BirthdateNotApplicable } = attributes
    if (BirthdateNotApplicable && BirthdateNotApplicable.applicable === false) return {}
    return {
      presence: true,
      date: true,
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
  // TODO add Alternate Address
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
