import address from 'models/shared/locations/address'

const infractionOptions = [
  'Alimony',
  'Judgement',
  'Lien',
  'Federal',
]

const financialDelinquentPayments = {
  Name: (value, attributes, attributeName, options) => {
    const { requiredFinancialDelinquentName } = options
    if (requiredFinancialDelinquentName) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  Infractions: (value, attributes, attributeName, options) => {
    const { requiredFinancialDelinquentInfraction } = options
    if (requiredFinancialDelinquentInfraction) {
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
  Date: {
    presence: true,
    date: { requireDay: false },
  },
  Resolved: (value, attributes) => {
    const { ResolvedNotApplicable } = attributes
    if (ResolvedNotApplicable && ResolvedNotApplicable.applicable) {
      return {
        presence: true,
        date: { requireDay: false },
      }
    }
    return {}
  },
  CourtName: { presence: true, hasValue: true },
  CourtAddress: {
    presence: true,
    location: { validator: address },
  },
  Description: { presence: true, hasValue: true },
}

export default financialDelinquentPayments
