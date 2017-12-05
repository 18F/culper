import { api } from '../services/api'
import Layouts from '../components/Form/Location/Layouts'

export const isInternational = (location) => {
  return !['United States', 'POSTOFFICE'].includes(countryString(location.country || {}))
}

export const countryString = (country) => {
  if (country && Object.prototype.toString.call(country) === '[object Object]') {
    if (country.value && Object.prototype.toString.call(country.value) === '[object Array]') {
      return country.value[0]
    } else {
      return country.value
    }
  }
  return country
}

export default class LocationValidator {
  constructor (data = {}) {
    data = data || {}
    this.layout = data.layout

    // Data
    this.street = data.street
    this.street2 = data.street2
    this.city = data.city
    this.state = data.state
    this.zipcode = data.zipcode
    this.county = data.county
    this.country = countryString(data.country)
  }

  canGeocode () {
    switch (this.layout) {
    case Layouts.ADDRESS:
    case Layouts.US_ADDRESS:
      if (this.isInternational()) {
        return false
      }
      return !this.isInternational() && this.validLocation()
    default:
      return false
    }
  }

  geocode () {
    return new Geocoder().geocode({
      layout: this.layout,
      street: this.street,
      street2: this.street2,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
      county: this.county,
      country: countryString(this.country) || '',
      validated: false
    })
  }

  validStreet () {
    return !!this.street
  }

  validCity () {
    if (this.isPostOffice()) {
      return ['APO', 'FPO', 'DPO'].includes(this.city || '')
    }
    return !!this.city
  }

  validState () {
    if (this.isPostOffice()) {
      return ['AA', 'AE', 'AP'].includes(this.state || '')
    }
    return !!this.state
  }

  validZipcode () {
    if (!this.zipcode) {
      return false
    }
    return this.zipcode.length === 5
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

  isPostOffice () {
    return this.country === 'POSTOFFICE'
  }

  isInternational () {
    return !!this.validCountry() &&
      !this.isDomestic() &&
      !this.isPostOffice()
  }

  validLocation () {
    switch (this.layout) {
    case Layouts.BIRTHPLACE:
      if (this.isDomestic()) {
        return this.validFields(['city', 'state', 'county'])
      }
      return this.validFields(['city', 'country'])
    case Layouts.US_CITY_STATE_INTERNATIONAL_CITY_COUNTRY:
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
    case Layouts.CITY_STATE:
      return this.validFields(['city', 'state'])
    case Layouts.STREET_CITY_COUNTRY:
      return this.validFields(['street', 'city', 'country'])
    case Layouts.CITY_COUNTRY:
      return this.validFields(['city', 'country'])
    case Layouts.CITY_STATE_COUNTRY:
      if (this.isDomestic()) {
        return this.validFields(['city', 'state'])
      }
      return this.validFields(['city', 'country'])
    case Layouts.US_ADDRESS:
      return this.validFields(['street', 'city', 'state', 'zipcode'])
    case Layouts.STREET_CITY:
      return this.validFields(['street', 'city'])
    case Layouts.ADDRESS:
      if (this.isDomestic() || this.isPostOffice()) {
        return this.validFields(['street', 'city', 'state', 'zipcode'])
      }
      return this.validFields(['street', 'city', 'country'])
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
      case 'street':
        valid = valid && this.validStreet()
        break
      case 'city':
        valid = valid && this.validCity()
        break
      case 'state':
        valid = valid && this.validState()
        break
      case 'zipcode':
        valid = valid && this.validZipcode()
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
}

export class Geocoder {
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

  geocode (location) {
    return new Promise((resolve, reject) => {
      api
        .validate({
          type: 'location',
          props: location
        })
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
        .catch(() => {
          reject()
        })
    })
  }
}
