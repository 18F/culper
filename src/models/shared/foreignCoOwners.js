/* eslint-disable import/prefer-default-export */
import foreignCoOwner from 'models/shared/foreignCoOwner'

const foreignCoOwnersModel = {
  List: {
    presence: true,
    branchCollection: { validator: foreignCoOwner },
  },
}

export default foreignCoOwnersModel
