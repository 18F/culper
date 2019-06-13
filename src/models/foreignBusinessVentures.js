import name from 'models/shared/name'
import address from 'models/shared/locations/address'

const foreignBusinessVentures = {
  Name: { presence: true, model: { validator: name } },
  Address: { presence: true, location: { validator: address } },
  Citizenship: {
    presence: true,
    hasValue: { validator: { length: { minimum: 1 } } },
  },
  Description: { presence: true, hasValue: true },
  Relationship: { presence: true, hasValue: true },
  Dates: { presence: true, daterange: true },
  Association: { presence: true, hasValue: true },
  Position: { presence: true, hasValue: true },
  Service: { presence: true, hasValue: true },
  Support: { presence: true, hasValue: true },
  Compensation: { presence: true, hasValue: true },
}

export default foreignBusinessVentures
