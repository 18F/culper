import { api } from '../services/api'

export default class LocationValidator {
  constructor (data = {}) {
    // Props
    this.fields = data.fields || []
    this.domesticFields = data.domesticFields
    this.internationalFields = data.internationalFields

    // Data
    this.street = data.street
    this.city = data.city
    this.state = data.state
    this.zipcode = data.zipcode
    this.county = data.county
    this.country = data.country
    this.domestic = data.domestic
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

  validBirthPlace () {
    switch (this.domestic) {
      case 'Yes':
        return this.validCity() &&
          this.validState() &&
          this.validCounty()
      case 'No':
        return this.validCity() &&
          this.validCountry()
      default:
        return false
    }
  }

  hasAll (...keys) {
    for (let key of keys) {
      if (!this.fields[key]) {
        return false
      }
    }
    return true
  }

  isDomestic () {
    return this.country === 'United States'
  }

  isInternational () {
    return !!this.country
  }

  validFields () {
    return this.fields && !!this.fields.length
  }

  validLocation () {
    let valid = true
    for (let field of this.fields) {
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
        case 'birthPlace':
          valid = valid && this.validBirthPlace()
          break
      }
    }
    return valid
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

  isValid () {
    return this.validFields() && this.validLocation()
  }
}
