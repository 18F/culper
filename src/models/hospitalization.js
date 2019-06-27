import address from 'models/shared/locations/address'

const hospitalization = {
  // TODO from >= DOB, to <= NOW
  TreatmentDate: { presence: true, daterange: true },
  Admission: {
    presence: true,
    hasValue: { validator: { inclusion: ['Voluntary', 'Involuntary'] } },
  },
  Explanation: { presence: true, hasValue: true },
  FacilityAddress: { presence: true, location: { validator: address } },
  Facility: { presence: true, hasValue: true },
}

export default hospitalization
