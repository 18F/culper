import { unschema } from '../schema'
import { citizenshipStatus } from './citizenship-status'

describe('Schema for citizenship status', () => {
  it('can wrap in schema', () => {
    const data = {
      CitizenshipStatus: {},
      AbroadDocumentation: {},
      Explanation: {},
      DocumentNumber: {},
      DocumentIssued: {},
      DocumentName: {},
      DocumentExpiration: {},
      DocumentType: {},
      PlaceIssued: {
        country: null
      },
      CertificateNumber: {},
      CertificateIssued: {},
      CertificateName: {},
      CertificateCourtName: {},
      CertificateCourtAddress: {
        country: null
      },
      BornOnMilitaryInstallation: {},
      MilitaryBase: {},
      EntryDate: {},
      EntryLocation: {
        country: null
      },
      PriorCitizenship: {},
      HasAlienRegistration: {},
      AlienRegistrationNumber: {},
      AlienRegistrationExpiration: {},
      Basis: {},
      PermanentResidentCardNumber: {},
      ResidenceStatus: {}
    }

    expect(unschema(citizenshipStatus(data))).toEqual(data)
  })
})
