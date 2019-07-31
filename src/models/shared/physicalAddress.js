import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'
import { hasYesOrNo } from 'models/validate'

const physicalAddress = {
  HasDifferentAddress: (value, attributes, attributeName, options) => (
    options.militaryAddress === false ? {} : {
      presence: true,
      hasValue: { validator: hasYesOrNo },
    }
  ),
  Address: (value, attributes = {}, attributeName, options) => {
    const { HasDifferentAddress } = attributes
    if (options.militaryAddress === false || (HasDifferentAddress
      && HasDifferentAddress.value
      && HasDifferentAddress.value === 'Yes')) {
      return {
        presence: true,
        location: { ...options, validator: address },
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
