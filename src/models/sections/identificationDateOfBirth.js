import { SELF } from 'constants/dateLimits'
import date from '../../models/shared/date'
const identificationDateOfBirth = {
  Date: (value, attributes) => {
    return {
      presence: true,
      date: {
        ...SELF,
        validator: date,
        confirmed: !!attributes.Confirmed && attributes.Confirmed.checked,
      },
    }
  },
  Confirmed: {
    presence: false,
  },
}

export default identificationDateOfBirth
