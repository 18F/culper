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
  // TODO >= DOB, <= NOW
  Date: {
    presence: true,
    date: { requireDay: false },
  },
  // TODO >= date began, <= NOW
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
  Description: { presence: true, hasValue: true },
}

export default financialNonpayment
