
import birthplace from 'models/shared/locations/birthplace'

const identificationPlaceOfBirth = {
  Location: (value, attributes) => {
    return {
      presence: true,
      model: {
        validator: birthplace, requireCity: !attributes.Location.county, requireCounty: !attributes.Location.city
      }
    }
  },
}

export default identificationPlaceOfBirth
