import { validateModel } from 'models/validate'
import foreignPassport from 'models/foreignPassport'
import foreignPassportTravel from 'models/foreignPassportTravel'

export const validateForeignPassportTravel = data => (
  validateModel(data, foreignPassportTravel)
)

export const validateForeignPassport = data => (
  validateModel(data, foreignPassport)
)

export const validateCitizenshipPassports = (data) => {
  const citizenshipPassportsModel = {
    Passports: {
      presence: true,
      branchCollection: {
        validator: foreignPassport,
      },
    },
  }

  return validateModel(data, citizenshipPassportsModel)
}

export default class CitizenshipPassportsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateCitizenshipPassports(this.data) === true
  }
}

export class PassportItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCountry() {
    return validateModel(this.data, {
      Country: foreignPassport.Country,
    }) === true
  }

  validIssued() {
    return validateModel(this.data, {
      Issued: foreignPassport.Issued,
    }) === true
  }

  validLocation() {
    return validateModel(this.data, {
      Location: foreignPassport.Location,
    }) === true
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignPassport.Name,
    }) === true
  }

  validNumber() {
    return validateModel(this.data, {
      Number: foreignPassport.Number,
    }) === true
  }

  validExpiration() {
    return validateModel(this.data, {
      Expiration: foreignPassport.Expiration,
    }) === true
  }

  validUsed() {
    return validateModel(this.data, {
      Used: foreignPassport.Used,
    }) === true
  }

  validCountries() {
    return validateModel(this.data, {
      Used: foreignPassport.Used,
      Countries: foreignPassport.Countries,
    }) === true
  }

  isValid() {
    return validateForeignPassport(this.data) === true
  }
}

export class TravelItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCountry() {
    return validateModel(this.data, {
      Country: foreignPassportTravel.Country,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: foreignPassportTravel.Dates,
    }) === true
  }

  isValid() {
    return validateForeignPassportTravel(this.data) === true
  }
}
