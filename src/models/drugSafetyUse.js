const drugSafetyUse = {
  Description: { presence: true, hasValue: true },
  // TODO >= DOB, <= NOW
  InvolvementDates: { presence: true, daterange: true },
  EstimatedUse: { presence: true, hasValue: true },
}

export default drugSafetyUse
