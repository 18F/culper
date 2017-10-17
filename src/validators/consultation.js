import { ConsultationOrderValidator } from './order'

export default class ConsultationValidator {
  constructor (data = {}) {
    this.list = data.List || []
    this.listBranch = data.ListBranch
    this.consulted = (data.Consulted || {}).value
  }

  validConsulted () {
    return this.consulted === 'Yes' || this.consulted === 'No'
  }

  validList () {
    if (this.consulted === 'Yes' && this.list.length === 0) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (let order of this.list) {
      if (!new ConsultationOrderValidator(order.Item).isValid()) {
        return false
      }
    }

    return true
  }

  isValid () {
    if (!this.validConsulted()) {
      return false
    }

    if (this.consulted === 'No') {
      return true
    }

    return this.validList()
  }

}
