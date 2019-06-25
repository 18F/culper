import address from 'models/shared/locations/address'

const revoked = {
  Date: { presence: true, date: true },
  Agency: { presence: true, hasValue: true },
  Explanation: { presence: true, hasValue: true },
}

export default revoked
