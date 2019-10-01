import otherOffense from 'models/otherOffense'

const policeOtherOffensesModel = {
    List: {
      presence: true,
      branchCollection: { validator: otherOffense },
    },
  }

export default policeOtherOffensesModel
