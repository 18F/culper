import DateControlValidator from './datecontrol'

export default class IdentificationBirthDateValidator {
  constructor(data = {}) {
    this.date = data.Date || {}
  }

  isValid() {
    this.date.minDateEqualTo = true
    return new DateControlValidator(this.date).isValid()
  }
}
