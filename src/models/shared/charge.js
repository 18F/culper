import { offenseChargeTypes } from 'constants/enums/legalOptions'

const charge = {
  ChargeType: {
    presence: true,
    hasValue: { validator: { inclusion: offenseChargeTypes } },
  },
  CourtCharge: { presence: true, hasValue: true },
  CourtOutcome: { presence: true, hasValue: true },
  CourtDate: { presence: true, date: { requireDay: false } },
}

export default charge
