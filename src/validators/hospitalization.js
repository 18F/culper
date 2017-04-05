import DateRangeValidator from './daterange'
import AddressValidator from './address'
import { validGenericTextfield } from './helpers'

export default class HospitalizationValidator {
  constructor (state = {}, props) {
    this.treatmentDate = state.TreatmentDate
    this.admission = state.Admission || { value: null }
    this.facility = state.Facility
    this.facilityAddress = state.FacilityAddress
    this.explanation = state.Explanation
  }

  validTreatmentDate () {
    return new DateRangeValidator(this.treatmentDate)
  }

  validAdmission () {
    if (this.admission.value !== 'Voluntary' && this.admission.value !== 'Involuntary') {
      return false
    }
    return validGenericTextfield(this.explanation)
  }

  validFacilityAddress () {
    return new AddressValidator(this.facilityAddress)
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
