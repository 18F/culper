import residence from 'models/residence'

const historyResidence = {
  List: {
    presence: true,
    accordion: { validator: residence },
    // TODO add the below when we have access to birthdate
    /*
    durationCoverage: (value, attributes, attributeName, options) => {
      const { requireYears } = options

      return {
        requiredDuration: { years: requireYears },
      }
    },
    */
  },
}

export default historyResidence
