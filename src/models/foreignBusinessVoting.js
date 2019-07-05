const foreignBusinessVoting = {
  Date: { presence: true, date: true },
  Country: { presence: true, country: true },
  Reason: { presence: true, hasValue: true },
  Eligibility: { presence: true, hasValue: true },
}

export default foreignBusinessVoting
