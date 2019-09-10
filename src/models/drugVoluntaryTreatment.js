import { hasYesOrNo, checkValue } from 'models/validate'
import address from 'models/shared/locations/address'
import phone from 'models/shared/phone'
// import { drugTypes } from 'constants/enums/substanceOptions'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const drugVoluntaryTreatment = {
  DrugType: { presence: true, hasValue: { validator: { exclusion: ['Other'] } } },
  // TODO - add this back after fixing DrugType structure
  /*
  DrugType: { presence: true, hasValue: { validator: { inclusion: drugTypes } } },
  DrugTypeExplanation: (value, attributes) => {
    if (attributes.DrugType && attributes.DrugType.value === 'Other') {
      return { presence: true, hasValue: true }
    }
    return {}
  },
  */
  TreatmentProvider: { presence: true, hasValue: true },
  TreatmentProviderAddress: { presence: true, location: { validator: address } },
  TreatmentProviderTelephone: { presence: true, model: { validator: phone, requireNumber: true } },
  TreatmentDates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  TreatmentCompleted: { presence: true, hasValue: { validator: hasYesOrNo } },
  NoTreatmentExplanation: (value, attributes) => {
    if (checkValue(attributes.TreatmentCompleted, 'No')) {
      return { presence: true, hasValue: true }
    }
    return {}
  },
}

export default drugVoluntaryTreatment
