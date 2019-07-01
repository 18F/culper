import name from 'models/shared/name'
import address from 'models/shared/locations/address'
import { hasYesOrNo } from 'models/validate'

const petitionTypes = [
  'Chapter7',
  'Chapter11',
  'Chapter12',
  'Chapter13',
]

const financialBankruptcy = {
  PetitionType: {
    presence: true,
    hasValue: {
      validator: {
        inclusion: petitionTypes,
      },
    },
  },
  CourtAddress: {
    presence: true,
    location: { validator: address },
  },
  CourtInvolved: { presence: true, hasValue: true },
  CourtNumber: { presence: true, hasValue: true },
  TotalAmount: {
    presence: true,
    hasValue: {
      validator: { numericality: true },
    },
  },
  // TODO >= DOB, <= NOW
  DateFiled: {
    presence: true,
    date: { requireDay: false },
  },
  // TODO >= date filed, <= NOW
  DateDischarged: (value, attributes) => {
    const { DateDischargedNotApplicable } = attributes
    if (DateDischargedNotApplicable && DateDischargedNotApplicable.applicable) {
      return {
        presence: true,
        date: { requireDay: false },
      }
    }
    return {}
  },
  NameDebt: {
    presence: true,
    model: { validator: name },
  },
  // TODO: HasDischargeExplanation is poorly named
  // It should be something along the lines of WasBankruptcyDebtsDischarged
  HasDischargeExplanation: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  DischargeExplanation: { presence: true, hasValue: true },
  Trustee: (value, attributes) => {
    const { PetitionType } = attributes
    if (PetitionType && PetitionType.value === 'Chapter13') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  TrusteeAddress: (value, attributes) => {
    const { PetitionType } = attributes
    if (PetitionType && PetitionType.value === 'Chapter13') {
      return {
        presence: true,
        location: { validator: address },
      }
    }
    return {}
  },
}

export default financialBankruptcy
