import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validGenericTextfield, validBranch } from './helpers'

export default class HospitalizationsValidator {
  constructor (state = {}, props) {
    this.list = state.List || []
    this.listBranch = state.ListBranch
    this.hospitalized = state.Hospitalized
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
      if (!new HospitalizationValidator(item.Hospitalization).isValid()) {
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
  constructor (state = {}, props) {
    this.treatmentDate = state.TreatmentDate
    this.admission = state.Admission || { value: null }
    this.facility = state.Facility
    this.facilityAddress = state.FacilityAddress
    this.explanation = state.Explanation
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
