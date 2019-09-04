import name from 'models/shared/name'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const foreignBusinessAdvice = {
  Name: { presence: true, model: { validator: name } },
  Description: { presence: true, hasValue: true },
  Organization: { presence: true, hasValue: true },
  Country: { presence: true, country: true },
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
}

export default foreignBusinessAdvice
