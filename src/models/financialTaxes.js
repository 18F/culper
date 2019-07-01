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
  // TODO >= DOB, <= NOW
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
  // TODO >= year failed to pay, <= NOW
  Date: (value, attributes = {}) => {
    const { DateNotApplicable } = attributes
    if (DateNotApplicable && DateNotApplicable.applicable) {
      return {
        presence: true,
        date: {
          requireDay: false,
        },
      }
    }
    return {}
  },
  Description: { presence: true, hasValue: true },
}

export default financialTaxes
