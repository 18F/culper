import name from 'models/shared/name'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'

const subsequentContact = {
  Subsequent: { presence: true, hasValue: true },
  // TODO must be >= DOB, <= NOW
  Recent: { presence: true, date: true },
  Future: { presence: true, hasValue: true },
}

const foreignBusinessContact = {
  Name: { presence: true, model: { validator: name } },
  Location: { presence: true, location: { validator: usCityStateZipInternationalCity } },
  // TODO must be >= DOB, <= NOW
  Date: { presence: true, date: true },
  Governments: { presence: true, country: true },
  Establishment: { presence: true, hasValue: true },
  Representatives: { presence: true, hasValue: true },
  Purpose: { presence: true, hasValue: true },
  SubsequentContacts: {
    presence: true,
    branchCollection: { validator: subsequentContact },
  },
}

export default foreignBusinessContact
