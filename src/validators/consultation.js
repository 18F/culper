import OrderValidator from './order'

export default class ConsultationValidator {
  constructor (state = {}, props) {
    this.list = state.List || []
    this.consulted = state.Consulted
  }

  validConsulted () {
    return this.consulted === 'Yes' || this.consulted === 'No'
  }

  validList () {
    if (this.consulted === 'Yes' && this.list.length === 0) {
      return false
    }

    for (let order of this.list) {
      if (!new OrderValidator(order.Consultation, null).isValid()) {
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
