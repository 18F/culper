const alcoholNegativeImpact = {
  Occurred: { presence: true, date: { requireDay: false } },
  Circumstances: { presence: true, hasValue: true },
  NegativeImpact: { presence: true, hasValue: true },
  Used: { presence: true, daterange: true },
}

export default alcoholNegativeImpact
