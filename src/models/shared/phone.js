/** numberType = Home, Work, Cell, not always required (options.requireNumberType) */
/** type = Domestic, International, DSN */

const phone = {
  noNumber: {},
  numberType: (value, attributes = {}, attributeName, options) => {
    const { requireNumberType } = options

    if (!requireNumberType || attributes.noNumber === true) return {}

    return { presence: true }
  },
  timeOfDay: (value, attributes = {}) => {
    if (attributes.noNumber === true) return {}
    return { presence: true }
  },
  type: {
    inclusion: ['Domestic', 'DSN', 'International'],
  },
  number: (value, attributes = {}) => {
    if (attributes.noNumber === true) return {}

    switch (attributes.type) {
      case 'Domestic':
        return {
          presence: true,
          format: { pattern: /^\d{10}$/ },
        }
      case 'DSN':
        return {
          presence: true,
          format: { pattern: /^\d{7}$/ },
        }
      case 'International':
        return {
          presence: true,
          format: { pattern: /^\d{11,}$/ },
        }
      default: {
        return { presence: true }
      }
    }
  },
}

export default phone
