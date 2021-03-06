import { hasYesOrNo } from 'models/validate'
import financialCardAbuse from 'models/financialCardAbuse'

const cardAbuseModel = {
  HasCardAbuse: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasCardAbuse } = attributes
    if (HasCardAbuse && HasCardAbuse.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialCardAbuse },
      }
    }
    return {}
  },
}

export default cardAbuseModel
