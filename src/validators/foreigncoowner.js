/* eslint-disable import/prefer-default-export */
import foreignCoOwner from 'models/shared/foreignCoOwner'

export const foreignCoOwnersModel = {
  List: {
    presence: true,
    branchCollection: { validator: foreignCoOwner },
  },
}
