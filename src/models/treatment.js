import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'

const treatment = {
  Name: { presence: true, hasValue: true },
  Phone: { presence: true, model: { validator: phone } },
  // TODO no po box
  Address: { presence: true, location: { validator: address } },
}

export default treatment
