import { hasYesOrNo, checkValue } from 'models/validate'
import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'

const drugVoluntaryTreatment = {
  TreatmentProvider: { presence: true, hasValue: true },
  TreatmentProviderAddress: { presence: true, location: { validator: address } },
  TreatmentProviderTelephone: { presence: true, model: { validator: phone } },
  TreatmentDates: { presence: true, daterange: true },
  TreatmentCompleted: { presence: true, hasValue: { validator: hasYesOrNo } },
  NoTreatmentExplanation: (value, attributes) => {
    if (checkValue(attributes.TreatmentCompleted, 'No')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default drugVoluntaryTreatment
