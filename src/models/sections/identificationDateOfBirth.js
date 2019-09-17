import { SELF, TODAY } from 'constants/dateLimits'
import date from '../../models/shared/date'
import { DateTime } from 'luxon'
import requireTrue from '../validators/requireTrue'

const identificationDateOfBirth = {
  Date: (value, attributes) => {
    return {
      presence: true,
      date: {
        earliest: SELF.earliest,
        latest: !!attributes.Confirmed && attributes.Confirmed.checked ? TODAY : undefined,
        validator: date,
      },
    }
  },
  Confirmed: (value, attributes) => {
    if (attributes.Date) {
      var d = new Date(`${attributes.Date.month}/${attributes.Date.day}/${attributes.Date.year}`)
      d.setFullYear(attributes.Date.year)
      var age = TODAY.diff(DateTime.fromJSDate(d)).as('years')

      if (age < 16.0)
        return {
          presence: true,
          /* TODO validate checked property to ensure it is set to true
          checked: validator here
          */
          }
      else
        return {}
    }
    return {}
  }
}

export default identificationDateOfBirth
