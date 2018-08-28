import { unschema } from '../schema'
import { legalInvestigationsHistory } from './legal-investigations-history'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      HasHistory: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              Agency: {},
              AgencyExplanation: {},
              AgencyNotApplicable: {},
              Completed: {},
              CompletedNotApplicable: {},
              Issued: {},
              Granted: {},
              GrantedNotApplicable: {},
              ClearanceLevel: {
                Level: {},
                Explanation: {}
              },
              ClearanceLevelNotApplicable: {}
            }
          }
        ]
      }
    }

    expect(unschema(legalInvestigationsHistory(data))).toEqual(data)
  })
})
