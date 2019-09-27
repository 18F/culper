import militaryForeign from 'models/militaryForeign'

const militaryForeignModel = {
  List: {
    presence: true,
    branchCollection: {
      validator: militaryForeign,
    },
  },
}

export default militaryForeignModel
