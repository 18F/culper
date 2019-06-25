import name from 'models/shared/name'

const foreignBusinessAdvice = {
  Name: { presence: true, model: { validator: name } },
  Description: { presence: true, hasValue: true },
  Organization: { presence: true, hasValue: true },
  Country: { presence: true, hasValue: true },
  Dates: { presence: true, daterange: true },
}

export default foreignBusinessAdvice
