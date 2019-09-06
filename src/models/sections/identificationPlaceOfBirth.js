
import birthplace from 'models/shared/locations/birthplace'

const identificationPlaceOfBirth = {
  Location: (value, attributes) => {

    return {
      presence: true,
      location: {
        validator: birthplace, requireCity: value ? !value.county : true, requireCounty: value ? !value.city : true
      }
    }
  },
}

export default identificationPlaceOfBirth
