import { hasYesOrNo, checkValue } from 'models/validate'
import diagnosis from 'models/diagnosis'
import treatment from 'models/treatment'

const diagnoses = {
  Diagnosed: { presence: true, hasValue: { validator: hasYesOrNo } },
  DidNotConsult: (value, attributes) => {
    if (checkValue(attributes.Diagnosed, 'Yes')) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  InTreatment: (value, attributes) => {
    if (checkValue(attributes.Diagnosed, 'Yes')) {
      return { presence: true, hasValue: { validator: hasYesOrNo } }
    }
    return {}
  },
  DiagnosisList: (value, attributes) => {
    if (checkValue(attributes.Diagnosed, 'Yes')) {
      return { presence: true, accordion: { validator: diagnosis } }
    }
    return {}
  },
  TreatmentList: (value, attributes) => {
    if (checkValue(attributes.InTreatment, 'Yes')) {
      return { presence: true, accordion: { validator: treatment } }
    }
    return {}
  },
}

export default diagnoses
