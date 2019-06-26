const drugClearanceUse = {
  Description: { presence: true, hasValue: true },
  InvolvementDates: { presence: true, daterange: true },
  EstimatedUse: { presence: true, hasValue: true },
}

export default drugClearanceUse
