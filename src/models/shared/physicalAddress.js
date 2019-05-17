import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'

const physicalAddress = {
  HasDifferentAddress: { presence: true },
  'HasDifferentAddress.value': {
    presence: true,
    inclusion: ['Yes', 'No'],
  },
  Address: (value, attributes = {}) => {
    const { HasDifferentAddress } = attributes
    if (HasDifferentAddress
      && HasDifferentAddress.value
      && HasDifferentAddress.value === 'Yes') {
      return {
        presence: true,
        location: { validator: address },
      }
    }

    return {}
  },
  Telephone: (value, attributes = {}) => {
    const { HasDifferentAddress } = attributes
    if (HasDifferentAddress
      && HasDifferentAddress.value
      && HasDifferentAddress.value === 'Yes') {
      return {
        presence: true,
        model: { validator: phone },
      }
    }

    return {}
  },
}

export default physicalAddress
