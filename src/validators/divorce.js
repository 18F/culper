import NameValidator from './name'
import LocationValidator from './location'
import { validDateField, validPhoneNumber } from './helpers'

export default class DivorceValidator {
  constructor(data = {}) {
    this.name = data.Name || {}
    this.birthdate = data.Birthdate || {}
    this.birthplace = data.BirthPlace || {}
    this.citizenship = data.Citizenship || {}
    this.telephone = data.Telephone || {}
    this.recognized = data.Recognized || {}
    this.address = data.Address || {}
    this.dateDivorced = data.DateDivorced || {}
    this.divorceLocation = data.DivorceLocation || {}
    this.status = data.Status || {}
    this.deceased = data.Deceased || {}
    this.deceasedAddress = data.DeceasedAddress || {}
  }

  validStatus() {
    const statusValue = this.status.value || ''
    return ['Divorced', 'Widowed', 'Annulled'].includes(statusValue)
  }

  validDivorceLocation() {
    const statusValue = this.status.value || ''
    if (statusValue === 'Widowed') {
      return true
    }

    return new LocationValidator(this.divorceLocation).isValid()
  }

  validDeceased() {
    const statusValue = this.status.value || ''
    if (statusValue === 'Widowed') {
      return true
    }

    const deceasedValue = this.deceased.value || ''
    if (!['Yes', 'No', 'DK'].includes(deceasedValue)) {
      return false
    }
    if (deceasedValue === 'No') {
      return new LocationValidator(this.deceasedAddress).isValid()
    }

    return true
  }

  validCitizenship() {
    const countries = this.citizenship.value || []
    return countries.length > 0
  }

  isValid() {
    return (
      new NameValidator(this.name).isValid() &&
      validDateField(this.birthdate) &&
      new LocationValidator(this.birthplace).isValid() &&
      this.validCitizenship() &&
      validPhoneNumber(this.telephone) &&
      validDateField(this.recognized) &&
      new LocationValidator(this.address).isValid() &&
      validDateField(this.dateDivorced) &&
      this.validDivorceLocation() &&
      this.validStatus() &&
      this.validDeceased()
    )
  }
}
