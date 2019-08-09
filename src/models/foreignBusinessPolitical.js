const foreignBusinessPolitical = {
  Position: { presence: true, hasValue: true },
  Dates: { presence: true, daterange: true },
  Country: { presence: true, country: true },
  Reason: { presence: true, hasValue: true },
  Eligibility: { presence: true, hasValue: true },
}

export default foreignBusinessPolitical
