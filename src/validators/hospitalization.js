import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validGenericTextfield, validBranch } from './helpers'

export default class HospitalizationsValidator {
  constructor (data = {}) {
    this.list = data.List || []
    this.listBranch = data.ListBranch
    this.hospitalized = data.Hospitalized
  }

  validList () {
    if (this.hospitalized === 'No') {
      return true
    }

    if (this.hospitalized === 'Yes' && this.list.length === 0) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (let item of this.list) {
      if (!new HospitalizationValidator(item.Item).isValid()) {
        return false
      }
    }
    return true
  }

  validHospitalization () {
    return validBranch(this.hospitalized)
  }

  isValid () {
    return this.validHospitalization() &&
      this.validList()
  }
}

export class HospitalizationValidator {
  constructor (data = {}) {
    this.treatmentDate = data.TreatmentDate
    this.admission = data.Admission || { value: null }
    this.facility = data.Facility
    this.facilityAddress = data.FacilityAddress
    this.explanation = data.Explanation
  }

  validTreatmentDate () {
    return new DateRangeValidator(this.treatmentDate).isValid()
  }

  validAdmission () {
    if (this.admission !== 'Voluntary' && this.admission !== 'Involuntary') {
      return false
    }
    return validGenericTextfield(this.explanation)
  }

  validFacilityAddress () {
    return new LocationValidator(this.facilityAddress).isValid()
  }

  validFacility () {
    return validGenericTextfield(this.facility)
  }

  isValid () {
    return this.validTreatmentDate() &&
      this.validAdmission() &&
      this.validFacilityAddress() &&
      this.validFacility()
  }
}
