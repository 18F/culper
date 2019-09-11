import { validateModel } from 'models/validate'
import foreignCoOwner from 'models/shared/foreignCoOwner'

export const foreignCoOwnersModel = {
  List: {
    presence: true,
    branchCollection: { validator: foreignCoOwner },
  },
}
