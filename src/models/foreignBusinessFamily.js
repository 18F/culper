import name from 'models/shared/name'

const foreignBusinessFamily = {
  Name: { presence: true, model: { validator: name } },
  Agency: { presence: true, hasValue: true },
  Country: { presence: true, hasValue: true },
  Date: { presence: true, date: true },
  Circumstances: { presence: true, hasValue: true },
}

export default foreignBusinessFamily
