import phone from 'models/shared/phone'
import cityState from 'models/shared/locations/cityState'

const financialCreditCounseling = {
  Explanation: { presence: true, hasValue: true },
  Name: { presence: true, hasValue: true },
  Telephone: {
    presence: true,
    model: { validator: phone, requireNumber: true },
  },
  Location: {
    presence: true,
    location: {
      validator: cityState,
    },
  },
  Description: { presence: true, hasValue: true },
}

export default financialCreditCounseling
