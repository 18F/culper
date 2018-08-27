import NameValidator from './name'

export default class IdentificationNameValidator {
  constructor(data = {}) {
    this.name = data.Name || {}
  }

  isValid() {
    return new NameValidator(this.name).isValid()
  }
}
