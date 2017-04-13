export default class CitizenshipValidator {
  constructor (state = {}, props = {}) {
    this.citizenshipStatus = state.CitizenshipStatus
  }

  validCitizenshipStatus () {
    return !!this.citizenshipStatus && ['Citizen', 'ForeignBorn', 'Naturalized', 'Derived', 'NotCitizen'].includes(this.citizenshipStatus)
  }

  isValid () {
    return this.validCitizenshipStatus()
  }
}
