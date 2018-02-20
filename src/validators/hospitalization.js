import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validAccordion, validGenericTextfield, validBranch } from './helpers'

export default class HospitalizationsValidator {
  constructor (data = {}) {
    this.list = data.List || {}
    this.hospitalized = (data.Hospitalized || {}).value
  }

  validList () {
    if (this.hospitalized === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new HospitalizationValidator(item).isValid()
    })
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
    this.admission = (data.Admission || {}).value
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
