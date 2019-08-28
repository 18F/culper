import locationModel from '../location'

const locationBirthplace = {
  city: {
    ...locationModel.city,
    presence: locationModel.county ? false : true,
  },
  state: locationModel.state,
  country: locationModel.country,
  county: {
    ...locationModel.county,
    presence: locationModel.city ? false : true,
  }
}

export default locationBirthplace
