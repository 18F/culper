import foreignPassport from 'models/foreignPassport'

const citizenshipPassportsModel = {
  Passports: {
    presence: true,
    branchCollection: {
      validator: foreignPassport,
    },
  },
}

export default citizenshipPassportsModel
