import employment from 'models/employment'

const historyEmployment = {
  EmploymentRecord: {
    presence: true,
    hasValue: {
      validator: { inclusion: ['No'] },
    },
  },
  List: {
    presence: true,
    accordion: { validator: employment },
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

export default historyEmployment
