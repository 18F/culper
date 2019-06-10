import { validateModel, checkValue } from 'models/validate'
import usPassport from 'models/usPassport'

export const validateUsPassport = (data) => {
  const { Issued, Expiration } = data
  const Dates = {
    from: Issued,
    to: Expiration,
  }

  return validateModel({
    ...data,
    Dates,
  }, usPassport) === true
}

export const hasValidUSPassport = (data = {}) => {
  const { HasPassports = {} } = data
  return checkValue(HasPassports, 'Yes') && validateUsPassport(data)
}

/**
 * This is for U.S. Passports
 */
export default class PassportValidator {
  constructor(data = {}) {
    this.data = data
    this.issued = data.Issued
    this.expiration = data.Expiration
  }

  validHasPassports() {
    return validateModel(this.data, {
      HasPassports: usPassport.HasPassports,
    }) === true
  }

  validPassportNumber() {
    return validateModel({
      ...this.data,
      Dates: {
        from: this.issued,
      },
    }, {
      Number: usPassport.Number,
    }) === true
  }

  validDates() {
    return validateModel({
      ...this.data,
      Dates: {
        from: this.issued,
        to: this.expiration,
      },
    }, {
      Dates: usPassport.Dates,
    }) === true
  }

  isValid() {
    return validateUsPassport(this.data)
  }
}
