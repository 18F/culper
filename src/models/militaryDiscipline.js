import { DEFAULT_LATEST } from 'constants/dateLimits'

const militaryDiscipline = {
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Offenses: { presence: true, hasValue: true },
  Name: { presence: true, hasValue: true },
  Court: { presence: true, hasValue: true },
  Outcome: { presence: true, hasValue: true },
}

export default militaryDiscipline
