import { api } from '../services/api'

export default class AddressValidator {
  constructor (state, props) {
    if (!state) {
      return
    }
    this.addressType = state.addressType
    this.apoFpo = state.apoFpo
    this.apoFpoType = state.apoFpoType
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
        if (!this.address || !this.city || !this.state || !this.zipcode) {
          return false
        }
        break

      case 'International':
        if (!this.address || !this.city || !this.country) {
          return false
        }
        break

      case 'APOFPO':
        if (!this.address || !this.apoFpo || !this.apoFpoType || !this.zipcode) {
          return false
        }
        break

      default:
        return false
    }
    return true
  }

  isDomestic () {
    return this.addressType === 'United States'
  }

  isApoFpo () {
    return this.addressType === 'APOFPO'
  }

  prepareGeocode () {
    let data = {}
    if (this.isDomestic()) {
      console.info('Geocoding Domestic Address')
      data = {
        Address: this.address,
        City: this.city,
        State: this.state,
        Zipcode: this.zipcode
      }
    } else if (this.isApoFpo()) {
      console.info('Geocoding APO/FPO Address')
      data = {
        Address: this.address,
        City: this.apoFpoType,
        State: this.apoFpo,
        Zipcode: this.zipcode
      }
    } else {
      console.warn(`Attemping to geocode an unsupported address type [${this.addressType}]`)
    }
    return data
  }

  geocode () {
    const toGeocode = this.prepareGeocode()
    return api
      .validateAddress(toGeocode)
      .then((response) => {
        return response.data
      })
  }
}
