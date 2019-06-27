import name from 'models/shared/name'

const foreignBusinessAdvice = {
  Name: { presence: true, model: { validator: name } },
  Description: { presence: true, hasValue: true },
  Organization: { presence: true, hasValue: true },
  // TODO country
  Country: { presence: true, hasValue: true },
  // TODO from must be >= DOB, to must be <= NOW
  Dates: { presence: true, daterange: true },
}

export default foreignBusinessAdvice
