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
        address: true,
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
        phone: true,
      }
    }

    return {}
  },
}

export default physicalAddress
