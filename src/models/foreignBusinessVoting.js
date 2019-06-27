const foreignBusinessVoting = {
  // TODO >= DOB, <= NOW
  Date: { presence: true, date: true },
  // TODO country
  Country: { presence: true, hasValue: true },
  Reason: { presence: true, hasValue: true },
  Eligibility: { presence: true, hasValue: true },
}

export default foreignBusinessVoting
