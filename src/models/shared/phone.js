/** numberType = Home, Work, Cell, not always required (options.requireNumberType) */
/** type = Domestic, International, DSN */

const phone = {
  noNumber: (value, attributes, attributeName, options) => {
    if (options.requireNumber) {
      return {
        inclusion: [false, ''],
      }
    }

    return {}
  },
  numberType: (value, attributes = {}, attributeName, options) => {
    const { requireNumber, requireNumberType } = options

    if (!requireNumberType
      || (!requireNumber && attributes.noNumber === true)) return {}

    return { presence: true }
  },
  timeOfDay: (value, attributes = {}, attributeName, options) => {
    if (!options.requireNumber && attributes.noNumber === true) return {}
    return { presence: true }
  },
  type: {
    inclusion: ['Domestic', 'DSN', 'International'],
  },
  number: (value, attributes = {}, attributeName, options) => {
    if (!options.requireNumber && attributes.noNumber === true) return {}

    switch (attributes.type) {
      case 'Domestic':
        return {
          presence: true,
          format: { pattern: /^((?!(0))[0-9]{10})$/ },
        }
      case 'DSN':
        return {
          presence: true,
          format: { pattern: /^\d{7}$/ },
        }
      case 'International':
        return {
          presence: true,
          format: { pattern: /^\d{4,20}$/ },
        }
      default: {
        return { presence: true }
      }
    }
  },
}

export default phone
