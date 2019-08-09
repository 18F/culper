import { hasYesOrNo } from 'models/validate'

// This is an array for some reason.
const isUnitedStates = value => value && value.includes('United States')

const citizenship = {
  Country: { presence: true, country: true },
  Dates: { presence: true, daterange: true },
  Current: (value, attributes) => (
    (attributes.Dates && !attributes.Dates.present)
      ? { presence: true, hasValue: { validator: hasYesOrNo } }
      : {}
  ),
  CurrentExplanation: (value, attributes) => (
    (attributes.Dates && !attributes.Dates.present)
      ? { presence: true, hasValue: true }
      : {}
  ),
  How: (value, attributes) => (
    (!attributes.Country || isUnitedStates(attributes.Country.value))
      ? {}
      : { presence: true, hasValue: true }
  ),
  Renounced: (value, attributes, attributeName, options) => (
    ((!attributes.Country || isUnitedStates(attributes.Country.value))
      || !options.requireCitizenshipRenounced)
      ? {}
      : {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
  ),
  RenouncedExplanation: (value, attributes, attributeName, options) => (
    ((!attributes.Country || isUnitedStates(attributes.Country.value))
      || !options.requireCitizenshipRenounced)
      ? {}
      : { presence: true, hasValue: true }
  ),
}

export default citizenship
