import LocationValidator from './location'

export default class IdentificationBirthPlaceValidator {
  constructor(data = {}) {
    this.location = data.Location
  }

  isValid() {
    return new LocationValidator(this.location).isValid()
  }
}
