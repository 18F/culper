import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'

const treatment = {
  Name: { presence: true, hasValue: true },
  Phone: { presence: true, model: { validator: phone, requireNumber: true } },
  Address: {
    presence: true,
    location: {
      validator: address,
      allowPOBox: false,
    },
  },
}

export default treatment
