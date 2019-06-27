import { validate } from 'validate.js'
import usStates from 'constants/enums/usStates'
import usTerritories from 'constants/enums/usTerritories'
import militaryStates from 'constants/enums/militaryStates'

import { api } from '../services/api'
import Layouts from '../components/Form/Location/Layouts'
import { isZipcodeState, zipcodes } from '../config'

export const countryString = (country) => {
  if (validate.isHash(country)) {
    if (country.value === null) return null
    if (country.value === undefined) return undefined

    if (Array.isArray(country.value)) {
      return country.value[0]
    }

    return country.value
  }

  return country
}

export const isInternational = location => (
  !['United States', 'POSTOFFICE'].includes(
    countryString(location.country || {})
  )
)

/**
 * Take a potential state name and convert it to its state code.
 * @param {Type of state} state - The state name.
 * @returns {Return Type} State code.
 */
const toCode = (state) => {
  const allUsStates = [
    ...usStates,
    ...usTerritories,
    ...militaryStates,
  ]

  const selectedState = allUsStates
    .find(stateObj => stateObj.name.toLowerCase() === state.toLowerCase())

  if (selectedState) {
    return selectedState.postalCode
  }

  return state
}

export class Geocoder {
  isSystemError = (data) => {
    if (!data || !data.Errors || !data.Errors.length) {
      return false
    }

    for (let i = 0; i < data.Errors.length; i += 1) {
      const e = data.Errors[i]
      if (e.Error.indexOf('error.geocode.system') !== -1) {
        return true
      }
    }

    return false
  }

  geocode(location) {
    return new Promise((resolve, reject) => {
      api
        .validate({
          type: 'location',
          props: location,
        })
        .then((r) => {
          const { data } = r
          if (this.isSystemError(data)) {
            return reject(data)
          }

          if (!r.data.Errors || !r.data.Errors.length) {
            return resolve({})
          }

          return resolve(r.data.Errors[0])
        })
        .catch(() => {
          reject(new Error('Failed to validate address'))
        })
    })
  }
}

export default class LocationValidator {
  constructor(data = {}) {
    if (data) {
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
  }

  canGeocode() {
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

  geocode() {
    return new Geocoder().geocode({
      layout: this.layout,
      street: this.street,
      street2: this.street2,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
      county: this.county,
      country: countryString(this.country) || '',
      validated: false,
    })
  }

  validStreet() {
    return !!this.street
  }

  validCity() {
    if (this.isPostOffice()) {
      return ['APO', 'FPO', 'DPO'].includes(this.city || '')
    }
    return !!this.city
  }

  validState() {
    const code = toCode(this.state || '').toUpperCase()

    if (this.isPostOffice()) {
      const militaryCodes = militaryStates.map(state => state.postalCode)
      return militaryCodes.includes(code)
    }

    const codes = [...usStates, ...usTerritories].map(
      state => state.postalCode
    )

    return !!this.state && codes.includes(code)
  }

  validZipcode() {
    if (!this.zipcode) {
      return false
    }

    const withoutDashes = this.zipcode.replace('-', '').length
    return withoutDashes === 5 || withoutDashes === 9
  }

  validZipcodeState() {
    const code = (this.state || '').toUpperCase()

    if (!zipcodes[code] || !this.validZipcode()) {
      return false
    }

    return isZipcodeState(this.state, this.zipcode)
  }

  validCounty() {
    return !!this.county
  }

  validCountry() {
    return !!this.country
  }

  isDomestic() {
    return this.country === 'United States'
  }

  isPostOffice() {
    return this.country === 'POSTOFFICE'
  }

  // TODO: this function doesn't quite work as an empty value for country
  // should not necessarily preclude a valid international address
  // for example, if the address is pristine and hasnt been modified
  isInternational() {
    return this.validCountry() && !this.isDomestic() && !this.isPostOffice()
  }

  validLocation() {
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
          return this.validFields(['city', 'state', 'zipcode', 'stateZipcode'])
        }
        return this.validFields(['city', 'country'])
      case Layouts.STATE:
        return this.validFields(['state'])
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
        return this.validFields([
          'street',
          'city',
          'state',
          'zipcode',
          'stateZipcode',
        ])
      case Layouts.STREET_CITY:
        return this.validFields(['street', 'city'])
      case Layouts.ADDRESS:
        if (this.isDomestic() || this.isPostOffice()) {
          return this.validFields([
            'street',
            'city',
            'state',
            'zipcode',
            'stateZipcode',
          ])
        }
        return this.validFields(['street', 'city', 'country'])
      case Layouts.OFFENSE:
        if (this.isDomestic()) {
          return this.validFields(['city', 'stateZipcode', 'county'])
        }
        return this.validFields(['city', 'country'])
      default:
        return false
    }
  }

  validFields(fields) {
    if (!fields || !fields.length) {
      return false
    }

    let valid = true
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i]
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
        case 'stateZipcode':
          valid = valid && this.validZipcodeState()
          break
        case 'county':
          valid = valid && this.validCounty()
          break
        case 'country':
          valid = valid && this.validCountry()
          break
        default:
      }
    }

    return valid
  }

  isValid() {
    return this.validLocation()
  }
}
