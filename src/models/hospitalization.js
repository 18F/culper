import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const hospitalization = {
  TreatmentDate: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Admission: {
    presence: true,
    hasValue: { validator: { inclusion: ['Voluntary', 'Involuntary'] } },
  },
  Explanation: { presence: true, hasValue: true },
  FacilityAddress: { presence: true, location: { validator: address, allowPOBox: false } },
  Facility: { presence: true, hasValue: true },
}

export default hospitalization
