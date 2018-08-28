import { ConsultationOrderValidator } from './order'
import { validAccordion } from './helpers'

export default class ConsultationValidator {
  constructor(data = {}) {
    this.list = data.List || {}
    this.consulted = (data.Consulted || {}).value
  }

  validConsulted() {
    return this.consulted === 'Yes' || this.consulted === 'No'
  }

  validList() {
    if (this.consulted === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new ConsultationOrderValidator(item).isValid()
    })
  }

  isValid() {
    if (!this.validConsulted()) {
      return false
    }

    if (this.consulted === 'No') {
      return true
    }

    return this.validList()
  }
}
