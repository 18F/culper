import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessVoting from 'models/foreignBusinessVoting'

export const validateForeignBusinessVoting = (data, formType, options = {}) => {
  const foreignBusinessVotingModel = {
    HasForeignVoting: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignVoting && attributes.HasForeignVoting.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessVoting },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessVotingModel, options)
}
