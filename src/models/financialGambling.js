const financialGambling = {
  // TODO >= DOB, <= NOW
  Dates: { presence: true, daterange: true },
  Losses: {
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
  Actions: { presence: true, hasValue: true },
}

export default financialGambling
