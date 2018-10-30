import { api } from '../services/api'
import Layouts from '../components/Form/Location/Layouts'
import { isZipcodeState, zipcodes } from '../config'

const isDefined = x => x !== null && x !== undefined

export const isInternational = location => {
  return !['United States', 'POSTOFFICE'].includes(
    countryString(location.country || {})
  )
}

// XXX TEST ME
export const countryString = country => {
  if (country && isDefined(country.value)) {
    if (Array.isArray(country.value)) {
      return country.value[0]
    }

    return country.value
  }

  return country
}

export default class LocationValidator {
  constructor(data = {}) {
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
      validated: false
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

    const codes = [...unitedStates, ...otherUsTerritories].map(
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

  // TODO: this function doesn't quite work as an empty value for country should not necessarily preclude a valid international address
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
          'stateZipcode'
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
            'stateZipcode'
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
        case 'stateZipcode':
          valid = valid && this.validZipcodeState()
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

  isValid() {
    return this.validLocation()
  }
}

export class Geocoder {
  isSystemError(data) {
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

  geocode(location) {
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
          reject(new Error('Failed to validate address'))
        })
    })
  }
}

/**
 * Take a potential state name and convert it to its state code.
 * @param {Type of state} state - The state name.
 * @returns {Return Type} State code.
 */
const toCode = state => {
  const allUsStates = [
    ...unitedStates,
    ...otherUsTerritories,
    ...militaryStates
  ]
  const selectedState = allUsStates.find(stateObj => {
    return stateObj.name.toLowerCase() === state.toLowerCase()
  })

  if (selectedState) {
    return selectedState.postalCode
  }
  return state
}

export const unitedStates = [
  { name: 'Alabama', postalCode: 'AL' },
  { name: 'Alaska', postalCode: 'AK' },
  { name: 'Arizona', postalCode: 'AZ' },
  { name: 'Arkansas', postalCode: 'AR' },
  { name: 'California', postalCode: 'CA' },
  { name: 'Colorado', postalCode: 'CO' },
  { name: 'Connecticut', postalCode: 'CT' },
  { name: 'Delaware', postalCode: 'DE' },
  { name: 'Washington D.C.', postalCode: 'DC' },
  { name: 'Florida', postalCode: 'FL' },
  { name: 'Georgia', postalCode: 'GA' },
  { name: 'Hawaii', postalCode: 'HI' },
  { name: 'Idaho', postalCode: 'ID' },
  { name: 'Illinois', postalCode: 'IL' },
  { name: 'Indiana', postalCode: 'IN' },
  { name: 'Iowa', postalCode: 'IA' },
  { name: 'Kansas', postalCode: 'KS' },
  { name: 'Kentucky', postalCode: 'KY' },
  { name: 'Louisiana', postalCode: 'LA' },
  { name: 'Maine', postalCode: 'ME' },
  { name: 'Maryland', postalCode: 'MD' },
  { name: 'Massachusetts', postalCode: 'MA' },
  { name: 'Michigan', postalCode: 'MI' },
  { name: 'Minnesota', postalCode: 'MN' },
  { name: 'Mississippi', postalCode: 'MS' },
  { name: 'Missouri', postalCode: 'MO' },
  { name: 'Montana', postalCode: 'MT' },
  { name: 'Nebraska', postalCode: 'NE' },
  { name: 'Nevada', postalCode: 'NV' },
  { name: 'New Hampshire', postalCode: 'NH' },
  { name: 'New Jersey', postalCode: 'NJ' },
  { name: 'New Mexico', postalCode: 'NM' },
  { name: 'New York', postalCode: 'NY' },
  { name: 'North Carolina', postalCode: 'NC' },
  { name: 'North Dakota', postalCode: 'ND' },
  { name: 'Ohio', postalCode: 'OH' },
  { name: 'Oklahoma', postalCode: 'OK' },
  { name: 'Oregon', postalCode: 'OR' },
  { name: 'Pennsylvania', postalCode: 'PA' },
  { name: 'Rhode Island', postalCode: 'RI' },
  { name: 'South Carolina', postalCode: 'SC' },
  { name: 'South Dakota', postalCode: 'SD' },
  { name: 'Tennessee', postalCode: 'TN' },
  { name: 'Texas', postalCode: 'TX' },
  { name: 'Utah', postalCode: 'UT' },
  { name: 'Vermont', postalCode: 'VT' },
  { name: 'Virginia', postalCode: 'VA' },
  { name: 'Washington', postalCode: 'WA' },
  { name: 'West Virginia', postalCode: 'WV' },
  { name: 'Wisconsin', postalCode: 'WI' },
  { name: 'Wyoming', postalCode: 'WY' }
]

export const otherUsTerritories = [
  { name: 'American Samoa', postalCode: 'AS' },
  { name: 'FQ', postalCode: 'FQ' },
  { name: 'Guam', postalCode: 'GU' },
  { name: 'HQ', postalCode: 'HQ' },
  { name: 'DQ', postalCode: 'DQ' },
  { name: 'JQ', postalCode: 'JQ' },
  { name: 'KQ', postalCode: 'KQ' },
  { name: 'Marshall Islands', postalCode: 'MH' },
  { name: 'Micronesia', postalCode: 'FM' },
  { name: 'MQ', postalCode: 'MQ' },
  { name: 'BQ', postalCode: 'BQ' },
  { name: 'Northern Mariana Islands', postalCode: 'MP' },
  { name: 'Palau', postalCode: 'PW' },
  { name: 'LQ', postalCode: 'LQ' },
  { name: 'Puerto Rico', postalCode: 'PR' },
  { name: 'Virgin Islands', postalCode: 'VI' },
  { name: 'WQ', postalCode: 'WQ' }
]

export const militaryStates = [
  { name: 'U.S. Armed Forces - Americas', postalCode: 'AA' },
  { name: 'U.S. Armed Forces - Europe', postalCode: 'AE' },
  { name: 'U.S. Armed Forces - Pacific', postalCode: 'AP' }
]
