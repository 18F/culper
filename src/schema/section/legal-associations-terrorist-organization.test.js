import { unschema } from '../schema'
import { legalAssociationsTerroristOrganization } from './legal-associations-terrorist-organization'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasTerrorist: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Organization: {},
              Address: {
                country: null
              },
              Dates: {
                from: {},
                to: {},
                present: null
              },
              Positions: {},
              PositionsNotApplicable: {},
              Contributions: {},
              ContributionsNotApplicable: {},
              Reasons: {}
            }
          }
        ]
      }
    }

    expect(unschema(legalAssociationsTerroristOrganization(data))).toEqual(data)
  })
})
