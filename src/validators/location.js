import { api } from '../services/api'
import Layouts from '../components/Form/Location/Layouts'

export default class LocationValidator {
  constructor (data = {}) {
    this.layout = data.layout

    // Data
    this.street = data.street
    this.city = data.city
    this.state = data.state
    this.zipcode = data.zipcode
    this.county = data.county
    this.country = data.country
  }

  validAddress () {
    return !!this.address
  }

  validCity () {
    return !!this.city
  }

  validState () {
    return !!this.state
  }

  validCounty () {
    return !!this.county
  }

  validCountry () {
    return !!this.country
  }

  isDomestic () {
    return this.country === 'United States'
  }

  isInternational () {
    return !!this.country
  }

  validLocation () {
    switch (this.layout) {
      case Layouts.BIRTHPLACE:
        if (this.isDomestic()) {
          return this.validFields(['city', 'state', 'county'])
        }
        return this.validFields(['city', 'country'])
      case Layouts.BIRTHPLACE_WITHOUT_COUNTY:
        if (this.isDomestic()) {
          return this.validFields(['city', 'state'])
        }
        return this.validFields(['city', 'country'])
      case Layouts.US_CITY_STATE_ZIP_INTERNATIONAL_CITY:
        if (this.isDomestic()) {
          return this.validFields(['city', 'state', 'zipcode'])
        }
        return this.validFields(['city', 'country'])
      case Layouts.STATE_CITY:
        return this.validFields(['state', 'city'])
      case Layouts.STREET_CITY_COUNTRY:
        return this.validFields(['street', 'city', 'country'])
      case Layouts.CITY_COUNTRY:
        return this.validFields(['city', 'country'])
      default:
        return false

    }
  }

  validFields (fields) {
    if (!fields || !fields.length) {
      return false
    }
    let valid = true
    for (let field of fields) {
      switch (field) {
        case 'address':
          valid = valid && this.validAddress()
          break
        case 'city':
          valid = valid && this.validCity()
          break
        case 'state':
          valid = valid && this.validState()
          break
        case 'county':
          valid = valid && this.validCounty()
          break
        case 'country':
          valid = valid && this.validCountry()
          break
      }
    }
    return valid
  }

  isValid () {
    return this.validLocation()
  }

  isSystemError (data) {
    if (!data || !data.Errors || !data.Errors.length) {
      return false
    }
    for (let e of data.Errors) {
      if (e.Error.indexOf('error.geocode.system') !== -1) {
        return true
      }
    }
    return false
  }

  canGeocode () {
    if (!this.street || !this.city || !this.state || !this.zipcode || !this.country) {
      return false
    }
    return true
  }

  geocode () {
    const location = {
      address: this.street,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode
    }
    return new Promise((resolve, reject) => {
      api
        .validateAddress(location)
        .then(r => {
          const data = r.data
          if (this.isSystemError(data)) {
            return reject(data)
          }
          if (!r.data.Errors || !r.data.Errors.length) {
            resolve({})
          }
          resolve(r.data.Errors[0])
        })
    })
  }

}
