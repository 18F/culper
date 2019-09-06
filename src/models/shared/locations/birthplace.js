import locationModel from '../location'
import { isInternational } from 'helpers/location'

const locationBirthplace = {
  city: (value, attributes, attributeName, options) => {
    if (options.requireCity === false)
      return {
        ...locationModel.city,
        presence: false,
      }
    return {
      ...locationModel.city,
      presence: true,
    }
  },
  state: locationModel.state,

  country: locationModel.country,
  county: (value, attributes, attributeName, options) => {
    if (options.requireCounty === false || isInternational(attributes))
      return {
        ...locationModel.county,
        presence: false,
      }
    return {
      ...locationModel.county,
      presence: true,
    }
  },
}

export default locationBirthplace
