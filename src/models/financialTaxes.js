import { DEFAULT_LATEST } from 'constants/dateLimits'

const taxFailureTypes = [
  'File',
  'Pay',
  'Both',
]

const financialTaxes = {
  Failure: {
    presence: true,
    hasValue: {
      validator: {
        inclusion: taxFailureTypes,
      },
    },
  },
  Year: {
    presence: true,
    date: {
      requireMonth: false,
      requireDay: false,
    },
  },
  Reason: { presence: true, hasValue: true },
  Agency: { presence: true, hasValue: true },
  TaxType: { presence: true, hasValue: true },
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
  Date: (value, attributes = {}) => {
    const { DateNotApplicable, Year } = attributes
    if (DateNotApplicable && DateNotApplicable.applicable === false) {
      return {}
    }
    const dateLimits = { latest: DEFAULT_LATEST }
    if (Year) dateLimits.earliest = Year

    return {
      presence: true,
      date: { requireDay: false, ...dateLimits },
    }
  },
  Description: { presence: true, hasValue: true },
}

export default financialTaxes
