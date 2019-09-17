import { validateModel, hasYesOrNo } from 'models/validate'
import militaryDiscipline from 'models/militaryDiscipline'

export const hideDisciplinaryProcedures = (store = {}) => !(store.Military
    && store.Military.History
    && store.Military.History.HasServed
    && store.Military.History.HasServed.value === 'Yes')


const militaryDisciplinaryProceduresModel = {
  HasDisciplinary: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    const { HasDisciplinary } = attributes
    if (HasDisciplinary && HasDisciplinary.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: militaryDiscipline },
      }
    }

    return {}
  },
}

export const validateMilitaryDisciplinaryProcedures = (data, formType, options = {}) => (
  validateModel(data, militaryDisciplinaryProceduresModel, options)
)
