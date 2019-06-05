import name from 'models/shared/name'
import alias from 'models/shared/alias'
import address from 'models/shared/locations/address'
import usAddress from 'models/shared/locations/usAddress'
import birthplaceWithoutCounty from 'models/shared/locations/birthplaceWithoutCounty'
import { hasYesOrNo } from 'models/validate'

import {
  MOTHER, immedateFamilyOptions, relativeCitizenshipDocumentationOptions,
  relativeResidentDocumentationOptions,
} from 'constants/enums/relationshipOptions'

import { countryString } from 'validators/location'

/** Helper functions */
export const isCitizen = attributes => !!(
  attributes.Citizenship
    && attributes.Citizenship.value
    && attributes.Citizenship.value.includes
    && attributes.Citizenship.value.includes('United States')
)

export const isLiving = attributes => (
  attributes.IsDeceased && attributes.IsDeceased.value === 'No'
)

export const requireCitizenshipDocumentation = (attributes) => {
  const bornInUS = attributes.Birthplace
    && attributes.Birthplace.country
    && countryString(attributes.Birthplace.country) === 'United States'

  return !!(isCitizen(attributes)
    && attributes.Birthplace
    && attributes.Birthplace.country
    && !bornInUS)
}

export const isLivingNonCitizen = attributes => (
  isLiving(attributes) && !isCitizen(attributes)
)

export const livesInUS = attributes => !!(
  attributes.Address
    && attributes.Address.country
    && countryString(attributes.Address.country) === 'United States'
)

export const requireResidenceDocumentation = attributes => (
  livesInUS(attributes) && isLivingNonCitizen(attributes)
)

/** Relative model */
const relative = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  Relation: {
    presence: true,
    hasValue: { validator: { length: { minimum: 1 } } },
  },
  Birthdate: {
    presence: true,
    date: true,
  },
  Birthplace: {
    presence: true,
    location: { validator: birthplaceWithoutCounty },
  },
  Citizenship: {
    presence: true,
    hasValue: { validator: { length: { minimum: 1 } } },
  },
  IsDeceased: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  MaidenName: (value, attributes) => {
    if (attributes.Relation
      && attributes.Relation.value === MOTHER) {
      return attributes.MaidenSameAsListed
        && attributes.MaidenSameAsListed.value === 'Yes'
        ? {}
        : {
          presence: true,
          model: { validator: name },
        }
    }

    return {}
  },
  Aliases: (value, attributes) => {
    if (attributes.Relation
      && !immedateFamilyOptions.includes(attributes.Relation.value)) {
      return {}
    }

    return {
      presence: true,
      branchCollection: {
        validator: alias,
        hideMaiden: attributes.Relation && attributes.Relation.value === MOTHER,
      },
    }
  },
  Address: (value, attributes) => {
    if (attributes.IsDeceased
      && attributes.IsDeceased.value === 'Yes') return {}

    return {
      presence: true,
      location: { validator: address },
    }
  },
  CitizenshipDocumentation: (value, attributes) => {
    if (requireCitizenshipDocumentation(attributes)) {
      return {
        presence: true,
        hasValue: {
          validator: {
            inclusion: relativeCitizenshipDocumentationOptions,
          },
        },
      }
    }

    return {}
  },
  OtherCitizenshipDocumentation: (value, attributes) => {
    if (attributes.CitizenshipDocumentation
      && attributes.CitizenshipDocumentation.value === 'Other') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  DocumentNumber: (value, attributes) => {
    if (requireCitizenshipDocumentation(attributes)) {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  CourtName: (value, attributes) => {
    if (requireCitizenshipDocumentation(attributes)) {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  CourtAddress: (value, attributes) => {
    if (requireCitizenshipDocumentation(attributes)) {
      return {
        presence: true,
        location: { validator: usAddress },
      }
    }

    return {}
  },
  Document: (value, attributes) => {
    if (requireResidenceDocumentation(attributes)) {
      return {
        presence: true,
        hasValue: {
          validator: {
            inclusion: relativeResidentDocumentationOptions,
          },
        },
      }
    }

    return {}
  },
  DocumentComments: (value, attributes) => {
    if (attributes.Document && attributes.Document.value === 'Other') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  ResidenceDocumentNumber: (value, attributes) => {
    if (requireResidenceDocumentation(attributes)) {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  Expiration: (value, attributes) => {
    if (requireResidenceDocumentation(attributes)) {
      return {
        presence: true,
        date: true,
      }
    }

    return {}
  },
  FirstContact: (value, attributes) => {
    if (isLivingNonCitizen(attributes)) {
      return {
        presence: true,
        date: true,
      }
    }

    return {}
  },
  LastContact: (value, attributes) => {
    if (isLivingNonCitizen(attributes)) {
      return {
        presence: true,
        date: true,
      }
    }

    return {}
  },
  Methods: (value, attributes) => {
    if (isLivingNonCitizen(attributes)) {
      return {
        presence: true,
        array: {
          validator: { presence: true },
          length: { minimum: 1 },
        },
      }
    }

    return {}
  },
  MethodsComments: (value, attributes) => {
    if (attributes.Methods
      && attributes.Methods.values
      && attributes.Methods.values.some
      && attributes.Methods.values.some(i => i === 'Other')) {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  Frequency: (value, attributes) => {
    if (isLivingNonCitizen(attributes)) {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  FrequencyComments: (value, attributes) => {
    if (attributes.Frequency
      && attributes.Frequency.value === 'Other') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  Employer: (value, attributes) => {
    if (attributes.EmployerNotApplicable
      && attributes.EmployerNotApplicable.applicable === false) return {}

    if (isLivingNonCitizen(attributes) && !livesInUS(attributes)) {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  EmployerAddress: (value, attributes) => {
    if (attributes.EmployerAddressNotApplicable
      && attributes.EmployerAddressNotApplicable.applicable === false) return {}

    if (isLivingNonCitizen(attributes) && !livesInUS(attributes)) {
      return {
        presence: true,
        location: { validator: address },
      }
    }

    return {}
  },
  HasAffiliation: (value, attributes) => {
    if (attributes.EmployerRelationshipNotApplicable
      && attributes.EmployerRelationshipNotApplicable.applicable === false) return {}

    if (isLivingNonCitizen(attributes) && !livesInUS(attributes)) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }

    return {}
  },
  EmployerRelationship: (value, attributes) => {
    if (attributes.HasAffiliation && attributes.HasAffiliation.value === 'Yes') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
}

export default relative
