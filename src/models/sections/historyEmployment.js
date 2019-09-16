import employment from 'models/employment'
import { getApplicantRequiredDuration } from 'helpers/date'

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
    durationCoverage: (value, attributes, attributeName, options) => {
      const { requireYears, applicantBirthdate } = options
      const years = getApplicantRequiredDuration({ years: requireYears }, applicantBirthdate)

      return {
        requiredDuration: { years },
      }
    },
  },
}

export default historyEmployment
