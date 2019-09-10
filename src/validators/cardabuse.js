import { validateModel, hasYesOrNo } from 'models/validate'
import financialCardAbuse from 'models/financialCardAbuse'
import { requireFinancialCardDisciplinaryDate } from 'helpers/branches'

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

export const validateFinancialCardAbuse = (data, formType) => (
  validateModel(
    data,
    cardAbuseModel,
    { requireFinancialCardDisciplinaryDate: requireFinancialCardDisciplinaryDate(formType) },
  )
)
