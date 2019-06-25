import { hasYesOrNo, checkValue } from 'models/validate'
import militaryService from './militaryService'

const militaryHistory = {
  HasServed: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => (
    checkValue(attributes.HasServed, 'Yes')
      ? {
        presence: true,
        accordion: { validator: militaryService },
      } : {}
  ),
}

export default militaryHistory
