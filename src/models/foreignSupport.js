import name from 'models/shared/name'
import address from 'models/shared/locations/address'

const foreignSupport = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  Address: {
    presence: true,
    location: { validator: address },
  },
  Relationship: { presence: true, hasValue: true },
  Amount: { presence: true, hasValue: true },
  Frequency: { presence: true, hasValue: true },
  // TODO country
  Citizenship: {
    presence: true,
    hasValue: { validator: { length: { minimum: 1 } } },
  },
}

export default foreignSupport
