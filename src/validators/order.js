import { validateModel } from 'models/validate'
import order from 'models/shared/order'

export const validateOrder = (data, requireDisposition = true) => (
  validateModel(data, order, { requireDisposition }) === true
)

export default class OrderValidator {
  constructor(data = {}) {
    this.data = data
    this.prefix = (data || {}).prefix || 'order'
  }

  validCourt() {
    return validateModel(this.data, {
      CourtName: order.CourtName,
      CourtAddress: order.CourtAddress,
    }) === true
  }

  validOccurred() {
    return validateModel(this.data, {
      Occurred: order.Occurred,
    }) === true
  }

  validDisposition() {
    return validateModel(this.data, {
      Disposition: order.Disposition,
    }, { requireDisposition: this.prefix !== 'competence' }) === true
  }

  validAppeals() {
    return validateModel(this.data, {
      Appeals: order.Appeals,
    }) === true
  }

  isValid() {
    return validateOrder(this.data, this.prefix !== 'competence')
  }
}

export class CompetenceOrderValidator extends OrderValidator {
  constructor(data = {}) {
    super(data)
    this.prefix = 'competence'
    this.courtAddress = data.CourtAddress
    this.courtName = data.CourtName
    this.occurred = data.Occurred
    this.appeals = data.Appeals
  }
}

export class ConsultationOrderValidator extends OrderValidator {
  constructor(data = {}) {
    super(data)
    this.prefix = 'consultation'
    this.courtAddress = data.CourtAddress
    this.courtName = data.CourtName
    this.occurred = data.Occurred
    this.appeals = data.Appeals
  }
}
