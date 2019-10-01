import offense from 'models/offense'

const policeOffensesModel = {
  List: {
    presence: true,
    branchCollection: { validator: offense },
  },
}

export default policeOffensesModel