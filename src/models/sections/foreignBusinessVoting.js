import { hasYesOrNo } from 'models/validate'
import foreignBusinessVoting from 'models/foreignBusinessVoting'

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

export default foreignBusinessVotingModel
