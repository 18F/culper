import address from 'models/shared/locations/address'

const unauthorizedTech = {
  Date: { presence: true, date: true },
  Incident: { presence: true, hasValue: true },
  Location: { presence: true, location: { validator: address } },
  Action: { presence: true, hasValue: true },
}

export default unauthorizedTech
