const phone = {
  noNumber: {},
  numberType: (value, attributes) => {
    // TODO - this is conditionally required
    if (attributes.noNumber === true) return {}
    return { presence: { allowEmpty: false } }
  },
  timeOfDay: (value, attributes) => {
    if (attributes.noNumber === true) return {}
    return { presence: { allowEmpty: false } }
  },
  type: {
    inclusion: ['Domestic', 'DSN', 'International'],
  },
  number: (value, attributes) => {
    if (attributes.noNumber === true) return {}

    switch (attributes.type) {
      case 'Domestic':
        return {
          presence: { allowEmpty: false },
          format: { pattern: /^\d{10}$/ },
        }
      case 'DSN':
        return {
          presence: { allowEmpty: false },
          format: { pattern: /^\d{7}$/ },
        }
      case 'International':
        return {
          presence: { allowEmpty: false },
          format: { pattern: /^\d{11,}$/ },
        }
      default: {
        return { presence: { allowEmpty: false } }
      }
    }
  },
}

export default phone
