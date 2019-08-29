import { hasYesOrNo } from 'models/validate'
import education from 'models/education'

const historyEducation = {
  HasAttended: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  HasDegree10: (value, attributes) => {
    // Only required if HasAttended is "No"
    if (attributes.HasAttended && attributes.HasAttended.value === 'No') {
      return {
        presence: true,
        hasValue: { validator: hasYesOrNo },
      }
    }

    return {}
  },
  List: (value, attributes) => {
    // Only required if either HasAttended or HasDegree10 is yes
    if ((attributes.HasAttended && attributes.HasAttended.value === 'Yes')
      || (attributes.HasDegree10 && attributes.HasDegree10.value === 'Yes')) {
      return {
        presence: true,
        accordion: { validator: education },
      }
    }

    return {}
  },
}

export default historyEducation
