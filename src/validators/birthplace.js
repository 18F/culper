export default class BirthPlaceValidator {
  constructor (state = {}, props = {}) {
    if (state.location) {
      state = state.location
    }
    this.domestic = this.domestic
    this.country = state.country && state.country.value ? state.country.value : state.country
    this.city = state.city
    this.state = state.state
    this.county = state.county
    this.hideCounty = (props || {}).hideCounty || false
  }

  isDomestic (domestic) {
    return this.domestic === 'Yes' || this.country === 'United States'
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
    if (this.country === 'United States') {
      return false
    }

    return !!this.city && !!this.country
  }

  /**
   * Validates a birthplace
   */
  isValid () {
    if (this.isDomestic()) {
      return this.validDomestic()
    } else {
      return this.validInternational()
    }
  }
}
