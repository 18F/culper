
export default class LocationValidator {
  constructor (data) {
    this.fields = data.fields
    this.address = data.address
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

  valid () {
    let valid = false

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
  }
}
