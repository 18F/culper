import foreignPassport from 'models/foreignPassport'

const citizenshipForeignPassports = {
  Passports: {
    presence: true,
    branchCollection: {
      validator: foreignPassport,
    },
  },
}

export default citizenshipForeignPassports
