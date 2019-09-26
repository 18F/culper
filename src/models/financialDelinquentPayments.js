import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const infractionOptions = [
  'Alimony',
  'Judgement',
  'Lien',
  'Federal',
]

const financialDelinquentPayments = {
  Name: (value, attributes, attributeName, options) => {
    const { requireFinancialDelinquentName } = options
    if (requireFinancialDelinquentName) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Infractions: (value, attributes, attributeName, options) => {
    const { requireFinancialDelinquentInfraction } = options
    if (requireFinancialDelinquentInfraction) {
      return {
        presence: true,
        array: {
          validator: {
            presence: true,
            inclusion: infractionOptions,
          },
          length: { minimum: 1 },
        },
      }
    }
    return {}
  },
  AccountNumber: { presence: true, hasValue: true },
  PropertyType: { presence: true, hasValue: true },
  Amount: {
    presence: true,
    hasValue: {
      validator: {
        numericality: {
          greaterThan: 0,
        },
      },
    },
  },
  Reason: { presence: true, hasValue: true },
  Status: { presence: true, hasValue: true },
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Resolved: (value, attributes) => {
    const { ResolvedNotApplicable } = attributes
    if (ResolvedNotApplicable && ResolvedNotApplicable.applicable === false) {
      return {}
    }
    const dateLimits = { latest: DEFAULT_LATEST }
    if (attributes.Date) dateLimits.earliest = attributes.Date

    return {
      presence: true,
      date: { requireDay: false, ...dateLimits },
    }
  },
  CourtName: { presence: true, hasValue: true },
  CourtAddress: {
    presence: true,
    location: { validator: address },
  },
  Description: { presence: true, hasValue: true },
}

export default financialDelinquentPayments
