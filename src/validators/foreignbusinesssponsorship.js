import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessSponsorship from 'models/foreignBusinessSponsorship'

export const validateForeignBusinessSponsorship = (data, formType, options = {}) => {
  const foreignBusinessSponsorshipModel = {
    HasForeignSponsorship: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignSponsorship && attributes.HasForeignSponsorship.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessSponsorship },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessSponsorshipModel, options)
}
