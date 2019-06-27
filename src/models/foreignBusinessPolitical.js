const foreignBusinessPolitical = {
  Position: { presence: true, hasValue: true },
  // TODO from >= DOB, <= NOW
  Dates: { presence: true, daterange: true },
  // TODO country
  Country: { presence: true, hasValue: true },
  Reason: { presence: true, hasValue: true },
  Eligibility: { presence: true, hasValue: true },
}

export default foreignBusinessPolitical
