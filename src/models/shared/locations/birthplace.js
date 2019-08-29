import locationModel from '../location'
import { isPO, isUS, isInternational } from 'helpers/location'

const locationBirthplace = {
  city: (value, attributes, attributeName, options) => {
    if (options.requireCity || isInternational(attributes))
      return {
        ...locationModel.city,
        presence: true,
      }
    return {
      ...locationModel.city,
      presence: false,
    }
  },
  state: (value, attributes, attributeName, options) => {
    if (isUS(attributes))
      return {
        ...locationModel.state,
        presence: true,
      }
    return {
      ...locationModel.state,
      presence: false,
    }
  },
  country: locationModel.country,
  county: (value, attributes, attributeName, options) => {
    if (options.requireCounty)
      return {
        ...locationModel.county,
        presence: true,
      }
    return {
      ...locationModel.county,
      presence: false,
    }
  },
}

export default locationBirthplace
