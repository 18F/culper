const foreignPassportTravel = {
  // TODO country inclusion?
  Country: { presence: true, hasValue: true },
  // TODO from must be >= DOB, to must be <= NOW
  Dates: { presence: true, daterange: true },
}

export default foreignPassportTravel
