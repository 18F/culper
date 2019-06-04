import { hasYesOrNo, checkValue } from 'models/validate'

const citizenship = {
  Country: { presence: true, hasValue: true },
  Dates: { presence: true, daterange: true },
  Current: (value, attributes) => {
    const { Dates } = attributes
    if (Dates && !Dates.present) {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }

    return {}
  },
  CurrentExplanation: (value, attributes) => (
    (attributes.Dates
      && !attributes.Dates.present
      && checkValue(attributes.Current, 'Yes'))
      ? { presence: true, hasValue: true }
      : {}
  ),
  How: (value, attributes) => (
    checkValue(attributes.Country, 'United States')
      ? {}
      : { presence: true, hasValue: true }
  ),
  Renounced: (value, attributes, attributeName, options) => (
    (checkValue(attributes.Country, 'United States')
      || !options.requireCitizenshipRenounced)
      ? {}
      : {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
  ),
  RenouncedExplanation: (value, attributes, attributeName, options) => (
    (checkValue(attributes.Country, 'United States')
      || !options.requireCitizenshipRenounced)
      ? {}
      : { presence: true, hasValue: true }
  ),
}

export default citizenship
