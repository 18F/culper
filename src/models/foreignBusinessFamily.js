import name from 'models/shared/name'

const foreignBusinessFamily = {
  Name: { presence: true, model: { validator: name } },
  Agency: { presence: true, hasValue: true },
  // TODO country
  Country: { presence: true, hasValue: true },
  // TODO must be >= 200 years ago, <= NOW
  Date: { presence: true, date: true },
  Circumstances: { presence: true, hasValue: true },
}

export default foreignBusinessFamily
