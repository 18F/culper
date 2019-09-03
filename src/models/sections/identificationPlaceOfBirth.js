
import birthplace from 'models/shared/locations/birthplace'

const identificationPlaceOfBirth = {
  Location: {
    presence: true,
    location: { validator: birthplace },
  },
}

export default identificationPlaceOfBirth
