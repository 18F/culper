const financialGambling = {
  Dates: { presence: true, daterange: true },
  Losses: {
    presence: true,
    hasValue: {
      validator: { numericality: true },
    },
  },
  Description: { presence: true, hasValue: true },
  Actions: { presence: true, hasValue: true },
}

export default financialGambling
