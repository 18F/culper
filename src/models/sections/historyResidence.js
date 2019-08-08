import residence from 'models/residence'

const historyResidence = {
  List: {
    presence: true,
    accordion: { validator: residence },
    durationCoverage: (value, attributes, attributeName, options) => {
      const { requireYears } = options

      return {
        requiredDuration: { years: requireYears },
      }
    },
  },
}

export default historyResidence
