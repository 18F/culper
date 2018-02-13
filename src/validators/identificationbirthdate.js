import DateControlValidator from './datecontrol'

export default class IdentificationBirthDateValidator {
  constructor (data = {}) {
    this.date = data.Date || {}
  }

  isValid () {
    return new DateControlValidator(this.date).isValid()
  }
}
