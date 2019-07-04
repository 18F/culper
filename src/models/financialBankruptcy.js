import name from 'models/shared/name'
import address from 'models/shared/locations/address'
import { hasYesOrNo } from 'models/validate'
import { DEFAULT_LATEST } from 'constants/dateLimits'

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
  DateFiled: {
    presence: true,
    date: { requireDay: false },
  },
  DateDischarged: (value, attributes) => {
    const { DateDischargedNotApplicable, DateFiled } = attributes
    if (DateDischargedNotApplicable && DateDischargedNotApplicable.applicable === false) {
      return {}
    }

    const dateLimits = { latest: DEFAULT_LATEST }
    if (DateFiled) dateLimits.earliest = DateFiled
    return {
      presence: true,
      date: { requireDay: false, ...dateLimits },
    }
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
