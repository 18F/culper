import { unschema } from '../schema'
import { legalAssociationsMembershipViolenceOrForce } from './legal-associations-membership-violence-or-force'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasViolence: { value: 'Yes' },
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

    expect(unschema(legalAssociationsMembershipViolenceOrForce(data))).toEqual(
      data
    )
  })
})
