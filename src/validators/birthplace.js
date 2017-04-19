export default class BirthPlaceValidator {
  constructor (state = {}, props = {}) {
    this.domestic = state.domestic
    this.country = state.country
    this.city = state.city
    this.state = state.state
    this.county = state.county
  }

  /**
   * Validates that the information is a valid domestic location
   */
  validDomestic () {
    if (this.country !== 'United States') {
      return false
    }

    if (!this.state) {
      return false
    }

    if (!this.county) {
      return false
    }

    if (!this.city) {
      return false
    }

    return true
  }

  /**
   * Validates that the information is a valid international location
   */
  validInternational () {
    if (this.country === 'United States') {
      return false
    }

    if (!this.city) {
      return false
    }
    return true
  }

  /**
   * Validates a birthplace
   */
  isValid () {
    if (this.domestic === 'Yes') {
      return this.validDomestic()
    } else {
      return this.validInternational()
    }
  }
}
