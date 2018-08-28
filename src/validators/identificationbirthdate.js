import DateControlValidator from './datecontrol'

export default class IdentificationBirthDateValidator {
  constructor(data = {}) {
    this.date = data.Date || {}
    this.confirmed = data.Confirmed || {}
  }

  isValid() {
    return new DateControlValidator(this.date).isValid()
  }
}
