import address from 'models/shared/locations/address'

const financialCardAbuse = {
  Agency: { presence: true, hasValue: true },
  Address: {
    presence: true,
    location: { validator: address },
  },
  // TODO >= DOB, <= NOW
  Date: {
    presence: true,
    date: { requireDay: false },
  },
  Reason: { presence: true, hasValue: true },
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
  Description: { presence: true, hasValue: true },
}

export default financialCardAbuse
