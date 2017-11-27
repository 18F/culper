import { unschema } from '../schema'
import { historyResidence } from './history-residence'

describe('Schema for financial taxes', () => {
  it('can wrap in schema', () => {
    const data = {
      List: {
        branch: { value: 'No' },
        items: [{
          Item: {
            Dates: {
              from: {},
              to: {},
              present: null
            },
            Address: {
              country: null
            },
            Comments: {},
            Reference: {
              FullName: {},
              LastContact: {},
              Relationship: {},
              RelationshipOther: {},
              Phone: {},
              Email: {},
              EmailNotApplicable: {},
              Address: {
                country: null
              }
            },
            Role: {},
            RoleOther: {}
          }
        }]
      }
    }

    expect(unschema(historyResidence(data))).toEqual(data)
  })
})
