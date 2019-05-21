import address from 'models/shared/locations/address'

const federal = {
  Name: { presence: true, hasValue: true },
  Position: { presence: true, hasValue: true },
  Address: { presence: true, location: { validator: address } },
  Dates: { presence: true, daterange: true },
}

export default federal
