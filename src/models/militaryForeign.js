import { hasYesOrNo } from 'models/validate'
import name from 'models/shared/name'
import address from 'models/shared/locations/address'

const foreignOrganization = [
  'Military',
  'Intelligence',
  'Diplomatic',
  'Security',
  'Militia',
  'Defense',
  'Other',
]

export const foreignMilitaryContact = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  Address: {
    presence: true,
    location: { validator: address },
  },
  Title: {
    presence: true,
    hasValue: true,
  },
  // TODO from >= DOB, to <= NOW
  Dates: {
    presence: true,
    daterange: true,
  },
  Frequency: {
    presence: true,
    hasValue: true,
  },
}

const militaryForeign = {
  Organization: {
    presence: true,
    hasValue: {
      validator: { inclusion: foreignOrganization },
    },
  },
  Name: { presence: true, hasValue: true },
  // TODO from >= DOB, to <= NOW
  Dates: { presence: true, daterange: true },
  // TODO country inclusion
  Country: { presence: true, hasValue: true },
  Rank: { presence: true, hasValue: true },
  Division: { presence: true, hasValue: true },
  Circumstances: { presence: true, hasValue: true },
  ReasonLeft: (value, attributes) => {
    if (attributes.Dates && attributes.Dates.present) return {}
    return { presence: true, hasValue: true }
  },
  MaintainsContact: (value, attributes, attributeName, options) => {
    const { requireForeignMilitaryMaintainsContact } = options
    if (requireForeignMilitaryMaintainsContact) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }
    return {}
  },
  List: (value, attributes) => {
    const { MaintainsContact } = attributes
    if (MaintainsContact && MaintainsContact.value === 'Yes') {
      return {
        presence: true,
        accordion: {
          validator: foreignMilitaryContact,
        },
      }
    }
    return {}
  },

}

export default militaryForeign
