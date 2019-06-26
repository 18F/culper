import { checkValue, hasYesOrNo } from 'models/validate'
import cityCountry from 'models/shared/locations/cityCountry'
import name from 'models/shared/name'
import foreignPassportTravel from 'models/foreignPassportTravel'

const foreignPassport = {
  // TODO country inclusion?
  Country: { presence: true, hasValue: true },
  // TODO must be >= DOB, <= NOW
  Issued: { presence: true, date: true },
  Location: {
    presence: true,
    location: { validator: cityCountry },
  },
  Name: {
    presence: true,
    model: { validator: name },
  },
  Number: { presence: true, hasValue: true },
  // TODO must be >= issued date
  Expiration: { presence: true, date: true },
  Used: { presence: true, hasValue: { validator: hasYesOrNo } },
  Countries: (value, attributes) => (
    checkValue(attributes.Used, 'Yes')
      ? {
        presence: true,
        accordion: {
          validator: foreignPassportTravel,
          ignoreBranch: true,
        },
      } : {}
  ),
}

export default foreignPassport
