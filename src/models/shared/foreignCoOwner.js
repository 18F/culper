import name from 'models/shared/name'
import address from 'models/shared/locations/address'

const foreignCoOwner = {
  Name: { presence: true, model: { validator: name } },
  Address: {
    presence: true,
    location: { validator: address },
  },
  Countries: { presence: true, country: true },
  RelationshipNature: {
    presence: true,
    hasValue: true,
  },
}

export default foreignCoOwner
