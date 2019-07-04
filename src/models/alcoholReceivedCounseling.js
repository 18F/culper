import { hasYesOrNo } from 'models/validate'
import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

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
  // TODO >= DOB, <= NOW
  TreatmentBeganDate: { presence: true, date: true },
  TreatmentEndDate: (value, attributes) => {
    const dateLimits = { latest: DEFAULT_LATEST }

    if (attributes.TreatmentBeganDate) {
      dateLimits.earliest = attributes.TreatmentBeganDate
    }

    return { presence: true, date: dateLimits }
  },
  TreatmentDates: { presence: true, daterange: true },
  CompletedTreatment: { presence: true, hasValue: { validator: hasYesOrNo } },
  NoCompletedTreatmentExplanation: { presence: true, hasValue: true },
}

export default alcoholReceivedCounseling
