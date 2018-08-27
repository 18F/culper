import { unschema } from '../schema'
import { legalCourt } from './legal-court'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasCourtActions: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              CivilActionDate: {},
              CourtName: {},
              CourtAddress: {
                country: null
              },
              NatureOfAction: {},
              ResultsOfAction: {},
              PrincipalPartyNames: {}
            }
          }
        ]
      }
    }

    expect(unschema(legalCourt(data))).toEqual(data)
  })
})
