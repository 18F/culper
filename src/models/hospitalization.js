import address from 'models/shared/locations/address'

const hospitalization = {
  TreatmentDate: { presence: true, daterange: true },
  Admission: {
    presence: true,
    hasValue: { validator: { inclusion: ['Voluntary', 'Involuntary'] } },
  },
  Explanation: { presence: true, hasValue: true },
  FacilityAddress: { presence: true, location: { validator: address, allowPOBox: false  } },
  Facility: { presence: true, hasValue: true },
}

export default hospitalization
