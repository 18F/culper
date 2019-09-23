import { hasYesOrNo } from 'models/validate'
import militaryDiscipline from 'models/militaryDiscipline'

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

export default militaryDisciplinaryProceduresModel
