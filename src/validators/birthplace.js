export default class BirthPlaceValidator {
  constructor (state = {}, props = {}) {
    this.domestic = state.domestic
    this.country = state.country
    this.city = state.city
    this.state = state.state
    this.county = state.county
    this.hideCounty = (props || {}).hideCounty || false
  }

  /**
   * Validates that the information is a valid domestic location
   */
  validDomestic () {
    if ((this.country || {}).value !== 'United States') {
      return false
    }

    if (!this.state) {
      return false
    }

    if (!this.hideCounty) {
      if (!this.county) {
        return false
      }
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
    if ((this.country || {}).value === 'United States') {
      return false
    }

    return !!this.city && !!this.country && !!(this.country || {}).value
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
