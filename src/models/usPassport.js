import { hasYesOrNo, checkValue } from 'models/validate'
import name from 'models/shared/name'
import { passportPattern } from 'constants/patterns'
import { cleanDateObject, createDateFromObject } from 'helpers/date'

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
    const { HasPassports, Dates } = attributes
    if (checkValue(HasPassports, 'No')) return {}

    const validations = {
      presence: true,
      hasValue: { validator: { format: passportPattern } },
    }

    // If issued in 1990 or after, must be 9 characters long
    const issuedDate = Dates && Dates.from && createDateFromObject(cleanDateObject(Dates.from))
    const dateThreshold = createDateFromObject({ day: 1, month: 1, year: 1990 })
    if (issuedDate && (issuedDate >= dateThreshold)) {
      validations.hasValue.validator.length = { is: 9 }
    }

    return validations
  },
  // TODO issue date must be >= DOB, <= NOW
  // TODO expiration date must be >= issue date, can be in the future
  Dates: (value, attributes) => (
    checkValue(attributes.HasPassports, 'No')
      ? {}
      : {
        presence: true,
        daterange: true,
      }
  ),
}

export default usPassport
