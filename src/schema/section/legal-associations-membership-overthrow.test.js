import { unschema } from '../schema'
import { legalAssociationsMembershipOverthrow } from './legal-associations-membership-overthrow'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasOverthrow: { value: 'Yes' },
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

    expect(unschema(legalAssociationsMembershipOverthrow(data))).toEqual(data)
  })
})
