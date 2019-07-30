import { validateModel } from 'models/validate'
import foreignPassport from 'models/foreignPassport'
import foreignPassportTravel from 'models/foreignPassportTravel'
import citizenshipForeignPassports from 'models/sections/citizenshipForeignPassports'

export const validateForeignPassportTravel = data => (
  validateModel(data, foreignPassportTravel) === true)

export const validateForeignPassport = data => (
  validateModel(data, foreignPassport) === true)

export const validateCitizenshipPassports = data => (
  validateModel(data, citizenshipForeignPassports) === true
)

export default class CitizenshipPassportsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateCitizenshipPassports(this.data)
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
    return validateForeignPassport(this.data)
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
    return validateForeignPassportTravel(this.data)
  }
}
