import address from 'models/shared/locations/address'

const nonCriminalCourtAction = {
  CivilActionDate: { presence: true, date: true },
  CourtName: { presence: true, hasValue: true },
  CourtAddress: { presence: true, location: { validator: address } },
  NatureOfAction: { presence: true, hasValue: true },
  ResultsOfAction: { presence: true, hasValue: true },
  PrincipalPartyNames: { presence: true, hasValue: true },
}

export default nonCriminalCourtAction
