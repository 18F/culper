import { hasYesOrNo } from 'models/validate'
import address from 'models/shared/locations/address'

const alcoholReceivedCounseling = {
  TreatmentProviderName: { presence: true, hasValue: true },
  UseSameAddress: { presence: true, hasValue: { validator: hasYesOrNo } },
  TreatmentProviderAddress: { presence: true, location: { validator: address } },
  AgencyAddress: (value, attributes) => {
    if (attributes.UseSameAddress && attributes.UseSameAddress.value === 'Yes') {
      return {}
    }
    return { presence: true, location: { validator: address } }
  },
  AgencyName: { presence: true, hasValue: true },
  TreatmentBeganDate: { presence: true, date: true },
  TreatmentEndDate: { presence: true, date: true },
  TreatmentDates: { presence: true, daterange: true },
  CompletedTreatment: { presence: true, hasValue: { validator: hasYesOrNo } },
  NoCompletedTreatmentExplanation: { presence: true, hasValue: true },
}

export default alcoholReceivedCounseling
