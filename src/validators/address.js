import { api } from '../services/api'

export default class AddressValidator {
  constructor (state, props) {
    if (!state) {
      return
    }
    this.addressType = state.addressType
    this.address = state.address
    this.city = state.city
    this.state = state.state
    this.zipcode = state.zipcode
    this.county = state.county
    this.country = state.country
  }

  isValid () {
    switch (this.addressType) {
      case 'United States':
        if (!this.address || !this.city || !this.state || !this.validZipcode(this.zipcode)) {
          return false
        }
        break

      case 'International':
        if (!this.address || !this.city || !this.country) {
          return false
        }
        break

      case 'APOFPO':
        if (!this.address || !this.city || !this.state || !this.validZipcode(this.zipcode)) {
          return false
        }
        break

      default:
        return false
    }
    return true
  }

  validZipcode (zip) {
    if (!zip) {
      return false
    }
    return zip.length === 5
  }

  isDomestic () {
    return this.addressType === 'United States'
  }

  isApoFpo () {
    return this.addressType === 'APOFPO'
  }

  prepareGeocode () {
    let data = {}
    if (this.isDomestic() || this.isApoFpo()) {
      data = {
        Address: this.address,
        City: this.city,
        State: this.state,
        Zipcode: this.zipcode
      }
    }
    return data
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

  geocode () {
    const toGeocode = this.prepareGeocode()
    return new Promise((resolve, reject) => {
      api
        .validateAddress(toGeocode)
        .then((response) => {
          const data = response.data
          if (this.isSystemError(data)) {
            return reject(data)
          }
          resolve(response.data)
        })
    })
  }
}
