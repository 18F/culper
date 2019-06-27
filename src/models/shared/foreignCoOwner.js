import name from 'models/shared/name'
import address from 'models/shared/locations/address'

const foreignCoOwner = {
  Name: { presence: true, model: { validator: name } },
  Address: {
    presence: true,
    location: { validator: address },
  },
  // TODO country
  Countries: {
    presence: true,
    hasValue: { validator: { length: { minimum: 1 } } },
  },
  RelationshipNature: {
    presence: true,
    hasValue: true,
  },
}

export default foreignCoOwner
