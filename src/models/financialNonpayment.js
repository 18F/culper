import { DEFAULT_LATEST } from 'constants/dateLimits'

const nonpaymentInfractionOptions = [
  'Repossession',
  'Defaulted',
  'Collections',
  'Cancelled',
  'Evicted',
  'Garnished',
  'Delinquent',
  'Any',
]

const financialNonpayment = {
  Name: { presence: true, hasValue: true },
  Infractions: {
    presence: true,
    array: {
      validator: {
        presence: true,
        inclusion: nonpaymentInfractionOptions,
      },
      length: { minimum: 1 },
    },
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
  Description: { presence: true, hasValue: true },
}

export default financialNonpayment
