
import birthplace from 'models/shared/locations/birthplace'

const identificationPlaceOfBirth = {
  Location: {
    presence: true,
    location: (value, attributes) => {
      return {
        validator: birthplace, requireCity: !value.county, requireCounty: !value.city
      }
    },
  },
}

export default identificationPlaceOfBirth
