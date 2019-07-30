import { hasYesOrNo, checkValue } from 'models/validate'
import name from 'models/shared/name'
import { passportPattern } from 'constants/patterns'
import { createDateFromObject } from 'helpers/date'

const usPassport = {
  HasPassports: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  Name: (value, attributes) => (
    checkValue(attributes.HasPassports, 'No')
      ? {}
      : {
        presence: true,
        model: { validator: name },
      }
  ),
  Number: (value, attributes) => {
    const { HasPassports, Issued } = attributes
    if (checkValue(HasPassports, 'No')) return {}

    const validations = {
      presence: true,
      hasValue: { validator: { format: passportPattern } },
    }

    // If issued in 1990 or after, must be 9 characters long
    const issuedDate = Issued && createDateFromObject(Issued)
    const dateThreshold = createDateFromObject({ day: 1, month: 1, year: 1990 })
    if (issuedDate && (issuedDate >= dateThreshold)) {
      validations.hasValue.validator.length = { is: 9 }
    }

    return validations
  },
  Issued: (value, attributes) => {
    if (checkValue(attributes.HasPassports, 'No')) return {}

    return {
      presence: true,
      date: true,
    }
  },
  Expiration: (value, attributes) => {
    const { HasPassports, Issued } = attributes
    if (checkValue(HasPassports, 'No')) return {}
    const dateLimits = {}
    if (Issued) dateLimits.earliest = Issued
    return { presence: true, date: dateLimits }
  },
}

export default usPassport
