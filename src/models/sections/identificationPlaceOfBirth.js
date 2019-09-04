
import birthplace from 'models/shared/locations/birthplace'

const identificationPlaceOfBirth = {
  Location: {
    presence: true,
    location: { validator: birthplace, requireCity: !data.Location.county, requireCounty: !data.Location.city },
  },
}

export default identificationPlaceOfBirth
