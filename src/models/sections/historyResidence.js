import residence from 'models/residence'
import { getApplicantRequiredDuration } from 'helpers/date'

const historyResidence = {
  List: {
    presence: true,
    accordion: { validator: residence },
    durationCoverage: (value, attributes, attributeName, options = {}) => {
      const { requireYears, applicantBirthdate } = options
      const years = getApplicantRequiredDuration({ years: requireYears }, applicantBirthdate)

      return {
        requiredDuration: { years },
      }
    },
  },
}

export default historyResidence
