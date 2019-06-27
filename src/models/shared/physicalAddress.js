import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'
import { hasYesOrNo } from 'models/validate'

const physicalAddress = {
  HasDifferentAddress: {
    presence: true,
    hasValue: {
      validator: hasYesOrNo,
    },
  },
  // TODO add PhysicalAlternateAddress validations
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
        presence: false, // Telephone is optional
        model: { validator: phone },
      }
    }

    return {}
  },
}

export default physicalAddress
