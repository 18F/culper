
import birthplace from 'models/shared/locations/birthplace'

const identificationPlaceOfBirth = {
  Location: (value, attributes) => {
    return {
      presence: true,
      model: {
        validator: birthplace, requireCity: !value.county, requireCounty: !value.city
      }
    }
  },
}

export default identificationPlaceOfBirth
