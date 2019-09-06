import address from 'models/shared/locations/address'
import { DEFAULT_LATEST } from 'constants/dateLimits'

const nonCriminalCourtAction = {
  CivilActionDate: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  CourtName: { presence: true, hasValue: true },
  CourtAddress: { presence: true, location: { validator: address } },
  NatureOfAction: { presence: true, hasValue: true },
  ResultsOfAction: { presence: true, hasValue: true },
  PrincipalPartyNames: { presence: true, hasValue: true },
}

export default nonCriminalCourtAction
