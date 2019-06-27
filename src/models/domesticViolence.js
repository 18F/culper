import offense from 'models/shared/locations/offense'

const domesticViolence = {
  CourtAddress: {
    presence: true,
    location: { validator: offense },
  },
  CourtName: { presence: true, hasValue: true },
  Explanation: { presence: true, hasValue: true },
  // TODO >= DOB, <= NOW
  Issued: { presence: true, date: { requireDay: false } },
}

export default domesticViolence
