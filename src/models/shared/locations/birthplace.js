import locationModel from '../location'

const locationBirthplace = {
  city: (value, attributes, attributeName, options) => {
    if (options.requireCity)
      return {
        ...locationModel.city,
        presence: true,
      }
      return {
        ...locationModel.city,
        presence: false,
      }
  },
  state: locationModel.state,
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
